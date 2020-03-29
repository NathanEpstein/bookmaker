# bookmaker
Simple book-making engine for setting odds based on flow of bets. For educational purposes.  

## install
`npm install bookiejs`

## usage 
See `book_test.js` for fuller usage example. 

```js
let book = require('./book.js');

let bets = [
	['over', 20],
	['under', 20],
	['under', 5],
	['over', 15],
	['under', 10],

];

let initProbs = {'over': 0.4, 'under': 0.6};

let odds = book.setOdds(bets, initProbs);
```
