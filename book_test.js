let book = require('./book.js');
let assert = require('assert');

let bets = [
	['over', 20],
	['under', 20],
	['under', 5],
	['over', 15],
	['under', 10],

];

let initProbs = {'over': 0.4, 'under': 0.6};

let odds = book.setOdds(bets, initProbs);


// probability and moneyLine odds should convert correctly
assert(book.moneylineToProb(-100) == 0.5);
assert(book.probToMoneyline(0.4) == 150);


// should quote odds for each outcome
let allOutcomes = Object.keys(odds);


assert(allOutcomes.indexOf('over') != -1);
assert(allOutcomes.indexOf('under') != -1);


// implied probs should sum to 1 + vigorish
let totalProb = 0;

allOutcomes.forEach(function(outcome) {
	let impliedProb = book.moneylineToProb(odds[outcome]);
	totalProb += impliedProb;
});

assert(totalProb == 1 + book.vigorish);
