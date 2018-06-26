/* eslint-disable no-undef, no-unused-vars, sort-vars, no-mixed-requires, global-require*/
const express = require('express');
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;




describe('crypto price skill', () => {
  let server = null;
  beforeEach(() => {
    const app = express();
    const cryptoPrice = require('../cryptoPrice');

    cryptoPrice.express({
      expressApp: app,
      debug: true,
      checkCert: false
    });
    server = app.listen(3000);
  });

  afterEach(() => {
    server.close();
  });

  it('responds to invalid data', () => request(server)
    .post('/cryptoPrice')
    .send({})
    .expect(200)
    .then(response => expect(response.body).to.eql({
      version: '1.0',
      response: {
        directives: [],
        shouldEndSession: true,
        outputSpeech: {
          type: 'SSML',
          ssml: '<speak>Error: not a valid request</speak>'
        }
      },
      sessionAttributes: {}
    })));

  it('responds to a launch event', () => request(server)
    .post('/cryptoPrice')
    .send({request: {type: 'LaunchRequest'}})
    .expect(200)
    .then((response) => {
      const {ssml} = response.body.response.outputSpeech;
      console.log(ssml);
      return expect(ssml).to.have.lengthOf.within(10,160);
    }));

  it('responds to a getPrice intent', () => request(server)
  .post('/cryptoPrice')
  .send({
    request: {
      type: 'IntentRequest',
      intent: {
        name: 'getPrice',
        slots: {
          currency: {
            name: 'currency',
             value: 'eos'
          }
        }
      }
    }
  })
.expect(200)
.then((response) => {
  const { ssml } = response.body.response.outputSpeech;
  console.log(ssml);
  return expect(ssml).to.have.lengthOf.within(40,160);
}));

  it('responds to a incorrect getPrice intent', () => request(server)
  .post('/cryptoPrice')
  .send({
    request: {
      type: 'IntentRequest',
      intent: {
        name: 'getPrice',
        slots: {
          currency: {
            name: 'currency',
            value: 'Etherafasdeum'
          }
        }
      }
    }
  })
.expect(200)
.then((response) => {
  const { ssml } = response.body.response.outputSpeech;
  console.log(ssml);
  return expect(ssml).to.have.lengthOf.within(40,160);
}));
    it('responds to a stop intent', () => request(server)
    .post('/cryptoPrice')
    .send({
      request: {
        type: 'IntentRequest',
        intent: {
          name: 'AMAZON.StopIntent',
          slots: {
            currency: {
              name: '',
              value: ''
            }
          }
        }
      }
    })
  .expect(200)
  .then((response) => {
    const { ssml } = response.body.response.outputSpeech;
    console.log(ssml);
    return expect(ssml).to.have.lengthOf.within(40,160);
  }));
        it('responds to a Help intent', () => request(server)
    .post('/cryptoPrice')
    .send({
      request: {
        type: 'IntentRequest',
        intent: {
          name: 'AMAZON.HelpIntent',
          slots: {
            currency: {
              name: '',
              value: ''
            }
          }
        }
      }
    })
  .expect(200)
  .then((response) => {
    const { ssml } = response.body.response.outputSpeech;
    console.log(ssml);
    return expect(ssml).to.have.lengthOf.within(40,200);
  }));

    it('responds to a synonim getPrice event', () => request(server)
  .post('/cryptoPrice')
  .send({
    request: {
      type: 'IntentRequest',
      intent: {
        name: 'getPrice',
        slots: {
          currency: {
            name: "currency",
            value: "bitkoin",
            resolutions: {
              resolutionsPerAuthority: [
                {
                  authority: "amzn1.er-authority.echo-sdk.amzn1.ask.skill.054e4f94-da18-4c02-85c3-ef5d9f6d9937.cryptocurrency",
                  status: {
                    code: "ER_SUCCESS_MATCH"
                  },
                  values: [
                    {
                      value: {
                        name: "btc",
                        id: "1c762234363a3edc10a2930d330db099"
                      }
                    }
                  ]
                }
              ]
            },
            confirmationStatus: "NONE"
          }
        }
      }
    }
  })
.expect(200)
.then((response) => {
  const { ssml } = response.body.response.outputSpeech;
  console.log(ssml);
  return expect(ssml).to.have.lengthOf.within(40,160);
}));
});



