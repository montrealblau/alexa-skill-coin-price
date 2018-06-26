'use strict';
const requestPromise = require('request-promise');
const lowerCase = require('lower-case')


const URL = 'https://api.coinmarketcap.com/v2/ticker/';

function getPriceIntentHelper() {
}

getPriceIntentHelper.prototype.getData = function() {
  var options = {
    method: 'GET',
    uri: URL,
    json: true
  };
  return requestPromise(options);
};

getPriceIntentHelper.prototype.formatRespoonse = function(responseObject,currency) {
	let result = find(responseObject,currency);
	if (responseObject.data != undefined && result != undefined) {
	let result = find(responseObject,currency);

	let price = "" + result.quotes.USD.price;

	// ja cena ir vairāk par 100, tad noapaļo
	if (price.split('.')[0].length > 2) {
		price = price.split('.')[0];
	}
	//ja cena ir mazāk kā 100, tad atstāj 2 ciparus aiz komata
	if (price.split('.')[0].length < 3 && price.split('.')[1].length > 2) {
		price = price.split('.')[0] +"."+ price.split('.')[1][0] + price.split('.')[1][1];
	}
	let name = "" + result.name;
	let rank = "" + result.rank;
	let change = "" + result.quotes.USD.percent_change_7d;

	if (change[0] === '-') {
		change = "down " + change.slice(1);
	}else{
		change = "up " + change;
	}
 
    return "The price for "+name+" is "+price+" dollars and it is "+change+" percent since the last week";
	}else{
		return "Could not retrieve crypto market data. Sorry! Please try later";
	}
};

function find(res,str){
	let search = lowerCase(str);
  	for(let a in res.data){
  		if(lowerCase(res.data[a].symbol) === search || lowerCase(res.data[a].name) === search){
  			return res.data[a];
  			break;
  		}
  	}
}

module.exports = getPriceIntentHelper;


   // "52": {
   //          "id": 52, 
   //          "name": "Ripple", 
   //          "symbol": "XRP", 
   //          "website_slug": "ripple", 
   //          "rank": 3, 
   //          "circulating_supply": 39245304677.0, 
   //          "total_supply": 99991944394.0, 
   //          "max_supply": 100000000000.0, 
   //          "quotes": {
   //              "USD": {
   //                  "price": 0.527879, 
   //                  "volume_24h": 212549000.0, 
   //                  "market_cap": 20716772188.0, 
   //                  "percent_change_1h": -0.95, 
   //                  "percent_change_24h": -3.3, 
   //                  "percent_change_7d": -21.19
   //              }
   //          }, 
   //          "last_updated": 1529155742
   //      }