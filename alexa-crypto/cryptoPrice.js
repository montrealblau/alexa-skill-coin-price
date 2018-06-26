const alexa = require('alexa-app');
const GetPriceIntentHelper = require('./getPriceIntentHelper');

const launchPhrases = ['I know all the cryptocurrency prices! ask one','Ask for any crypto price', 'Ask for coin price'];
const greetings = ['Hello!','Hey!','Hei!'];

const app = new alexa.app('cryptoPrice');

app.launch((req, res) => {
  res.say(randomPhrase(greetings)+" "+randomPhrase(launchPhrases)).reprompt('I am listening. Aks for cryptocurrency price!').shouldEndSession(false);
});

app.intent('getPrice', {
  slots: {
  	currency: 'cryptocurrency'
  },
  utterances: ['what is the price for {currency}','how much is {currency}', 'price for {currency}', '{currency} price']
}, (req, res) => {
	const slot = req.slots['currency'];
	var value = 'btc';
	if (slot.resolutions.length > 0 ) {
		value = slot.resolutions[0].first().name;
	}else{
		value = slot.value;
	}

  var getPriceIntentHelper = new GetPriceIntentHelper();
  return getPriceIntentHelper.getData()
  .then(data => {
    res.say(getPriceIntentHelper.formatRespoonse(data,value));
  })
  .catch(err => {
    console.log(err);
    res.say(getPriceIntentHelper.formatRespoonse({},value));
  })
});

app.customSlot("cryptocurrency", [ { value: 'BTC', synonyms: [ 'Bitcoin' ] },
  { value: 'LTC', synonyms: [ 'Litecoin' ] },
  { value: 'XRP', synonyms: [ 'Ripple' ] },
  { value: 'NXT', synonyms: [ 'Nxt' ] },
  { value: 'DOGE', synonyms: [ 'Dogecoin' ] },
  { value: 'DGB', synonyms: [ 'DigiByte' ] },
  { value: 'RDD', synonyms: [ 'ReddCoin' ] },
  { value: 'DASH', synonyms: [ 'Dash' ] },
  { value: 'MONA', synonyms: [ 'MonaCoin' ] },
  { value: 'MAID', synonyms: [ 'MaidSafeCoin' ] },
  { value: 'XMR', synonyms: [ 'Monero' ] },
  { value: 'BCN', synonyms: [ 'Bytecoin' ] },
  { value: 'BTS', synonyms: [ 'BitShares' ] },
  { value: 'XLM', synonyms: [ 'Stellar' ] },
  { value: 'SYS', synonyms: [ 'Syscoin' ] },
  { value: 'EMC', synonyms: [ 'Emercoin' ] },
  { value: 'XVG', synonyms: [ 'Verge' ] },
  { value: 'USDT', synonyms: [ 'Tether' ] },
  { value: 'XEM', synonyms: [ 'NEM' ] },
  { value: 'ETH', synonyms: [ 'Ethereum' ] },
  { value: 'SC', synonyms: [ 'Siacoin' ] },
  { value: 'REP', synonyms: [ 'Augur' ] },
  { value: 'DCR', synonyms: [ 'Decred' ] },
  { value: 'PIVX', synonyms: [ 'PIVX' ] },
  { value: 'LSK', synonyms: [ 'Lisk' ] },
  { value: 'DGD', synonyms: [ 'DigixDAO' ] },
  { value: 'STEEM', synonyms: [ 'Steem' ] },
  { value: 'WAVES', synonyms: [ 'Waves' ] },
  { value: 'ARDR', synonyms: [ 'Ardor' ] },
  { value: 'ETC', synonyms: [ 'Ethereum Classic' ] },
  { value: 'STRAT', synonyms: [ 'Stratis' ] },
  { value: 'NEO', synonyms: [ 'NEO' ] },
  { value: 'XZC', synonyms: [ 'ZCoin' ] },
  { value: 'ZEC', synonyms: [ 'Zcash' ] },
  { value: 'GNT', synonyms: [ 'Golem' ] },
  { value: 'MKR', synonyms: [ 'Maker' ] },
  { value: 'KMD', synonyms: [ 'Komodo' ] },
  { value: 'NANO', synonyms: [ 'Nano' ] },
  { value: 'ARK', synonyms: [ 'Ark' ] },
  { value: 'QTUM', synonyms: [ 'Qtum' ] },
  { value: 'BAT', synonyms: [ 'Basic Attention Token' ] },
  { value: 'AE', synonyms: [ 'Aeternity' ] },
  { value: 'VERI', synonyms: [ 'Veritaseum' ] },
  { value: 'MIOTA', synonyms: [ 'IOTA' ] },
  { value: 'BNT', synonyms: [ 'Bancor' ] },
  { value: 'GXS', synonyms: [ 'GXChain' ] },
  { value: 'FUN', synonyms: [ 'FunFair' ] },
  { value: 'SNT', synonyms: [ 'Status' ] },
  { value: 'EOS', synonyms: [ 'EOS' ] },
  { value: 'GAS', synonyms: [ 'Gas' ] },
  { value: 'PPT', synonyms: [ 'Populous' ] },
  { value: 'OMG', synonyms: [ 'OmiseGO' ] },
  { value: 'ETHOS', synonyms: [ 'Ethos' ] },
  { value: 'BCH', synonyms: [ 'Bitcoin Cash' ] },
  { value: 'BNB', synonyms: [ 'Binance Coin' ] },
  { value: 'BTM', synonyms: [ 'Bytom' ] },
  { value: 'DCN', synonyms: [ 'Dentacoin' ] },
  { value: 'ZRX', synonyms: [ '0x' ] },
  { value: 'HSR', synonyms: [ 'Hshare' ] },
  { value: 'VEN', synonyms: [ 'VeChain' ] },
  { value: 'NAS', synonyms: [ 'Nebulas' ] },
  { value: 'WTC', synonyms: [ 'Waltonchain' ] },
  { value: 'LRC', synonyms: [ 'Loopring' ] },
  { value: 'TRX', synonyms: [ 'TRON' ] },
  { value: 'MANA', synonyms: [ 'Decentraland' ] },
  { value: 'KNC', synonyms: [ 'Kyber Network' ] },
  { value: 'SUB', synonyms: [ 'Substratum' ] },
  { value: 'KIN', synonyms: [ 'Kin' ] },
  { value: 'ADA', synonyms: [ 'Cardano' ] },
  { value: 'RHOC', synonyms: [ 'RChain' ] },
  { value: 'CNX', synonyms: [ 'Cryptonex' ] },
  { value: 'ENG', synonyms: [ 'Enigma' ] },
  { value: 'AION', synonyms: [ 'Aion' ] },
  { value: 'BTG', synonyms: [ 'Bitcoin Gold' ] },
  { value: 'KCS', synonyms: [ 'KuCoin Shares' ] },
  { value: 'NULS', synonyms: [ 'Nuls' ] },
  { value: 'ICX', synonyms: [ 'ICON' ] },
  { value: 'QASH', synonyms: [ 'QASH' ] },
  { value: 'BCD', synonyms: [ 'Bitcoin Diamond' ] },
  { value: 'CMT', synonyms: [ 'CyberMiles' ] },
  { value: 'ELF', synonyms: [ 'aelf' ] },
  { value: 'BIX', synonyms: [ 'Bibox Token' ] },
  { value: 'WICC', synonyms: [ 'WaykiChain' ] },
  { value: 'MOAC', synonyms: [ 'MOAC' ] },
  { value: 'IOST', synonyms: [ 'IOST' ] },
  { value: 'THETA', synonyms: [ 'Theta Token' ] },
  { value: 'DDD', synonyms: [ 'Scry.info' ] },
  { value: 'ZIL', synonyms: [ 'Zilliqa' ] },
  { value: 'ELA', synonyms: [ 'Elastos' ] },
  { value: 'POLY', synonyms: [ 'Polymath' ] },
  { value: 'HT', synonyms: [ 'Huobi Token' ] },
  { value: 'FSN', synonyms: [ 'Fusion' ] },
  { value: 'ONT', synonyms: [ 'Ontology' ] },
  { value: 'BTCP', synonyms: [ 'Bitcoin Private' ] },
  { value: 'LOOM', synonyms: [ 'Loom Network' ] },
  { value: 'DROP', synonyms: [ 'Dropil' ] },
  { value: 'WAN', synonyms: [ 'Wanchain' ] },
  { value: 'MITH', synonyms: [ 'Mithril' ] },
  { value: 'CTXC', synonyms: [ 'Cortex' ] },
  { value: 'MTC', synonyms: [ 'Docademic' ] } ]
);

app.intent('getPrice', {
  slots: {
  	currency: 'cryptocurrency'
  }
  // utterances: ['what is the price for {currency}','how much is {currency}', 'price for {currency}', '{currency} price']
}, (req, res) => {
	const slot = req.slots['currency'];
	var value = 'btc';
	if (slot.resolutions.length > 0 ) {
		value = slot.resolutions[0].first().name;
	}else{
		value = slot.value;
	}

  var getPriceIntentHelper = new GetPriceIntentHelper();
  return getPriceIntentHelper.getData()
  .then(data => {
  	let speach = getPriceIntentHelper.formatRespoonse(data,value);
    res.say(speach);
    res.card({
	  type: "Standard",
	  title: "coin price",
	  text: speach,
	  image: {
	    smallImageUrl: "https://preview.ibb.co/fQ8oud/logo_coin_price.png"
	  }
	});
  })
  .catch(err => {
    console.log(err);
    res.say(getPriceIntentHelper.formatRespoonse({},value));
  })
});


app.intent("AMAZON.HelpIntent", {
    "slots": {},
    "utterances": []
  },
  function(request, response) {
    var helpOutput = "ask for cryptocurrency price. Just try it! For example. what is the price for bitcoin? You can ask differently as well! Or you can just say stop or exit to quit.";
    var reprompt = "What would you like to do?";
    // AMAZON.HelpIntent must leave session open -> .shouldEndSession(false)
    response.say(helpOutput).reprompt(reprompt).shouldEndSession(false);
  }
);

app.intent("AMAZON.StopIntent", {
    "slots": {},
    "utterances": []
  }, function(request, response) {
    var stopOutput = randomPhrase(["I will exit Crypto Price. Goodbye!","I will switch off Crypto Price. Goodbye!", "The Crypto Price is off. Goodbye!"]);
    response.say(stopOutput).shouldEndSession(true);
  }
);

app.intent("AMAZON.CancelIntent", {
    "slots": {},
    "utterances": []
  }, function(request, response) {
    var cancelOutput = randomPhrase(["I will exit Crypto Price. Goodbye!","I will switch off Crypto Price. Goodbye!", "The Crypto Price is off. Goodbye!"]);
    response.say(cancelOutput).shouldEndSession(true);
  }
);

function randomPhrase(arr) {
let i = 0;
i = Math.floor(Math.random() * arr.length);
return(arr[i]);
}

module.exports = app;