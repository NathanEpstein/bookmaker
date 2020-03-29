let vigorish = module.exports.vigorish = 0.15;


let moneylineToProb = module.exports.moneylineToProb = function(moneyLine)
{
	if (moneyLine < 0)
	{
		return (-moneyLine / (-moneyLine + 100));
	}
	else 
	{
		return (100 / (moneyLine + 100));
	}
}

let probToMoneyline = module.exports.probToMoneyline = function(prob)
{
	if (prob > 0.5)
	{
		return (-1 * (prob * 100) / (100 - prob * 100) * 100);
	}
	else 
	{
		return ((100 - prob * 100) / (prob * 100) * 100);
	}
}

let probFromBets = module.exports.probFromBets = function(bets)
{
	let total = 0; 
	let outcomes = {};

	bets.forEach(function(betTuple)
	{
		let outcome = betTuple[0];
		let amount = betTuple[1];
		
		// increment total bet and outcome specific amount
		total += amount;		
		outcomes[outcome] = outcomes[outcome] + amount || amount;
	});

	for (let k in outcomes)
	{
		outcomes[k] /= total;
	}

	return outcomes;
}

let setOdds = module.exports.setOdds = function(bets, initProbs)
{
	/*
	bets = [["outcome", amount1], ["otherOutcome", amount2], ....]
	- bets is a 2d array of all bets placed. Each sub-array is a tuple of outcome and amount wagered on outcome.

	initProbs = {"outcome": 0.2, "otherOutcome": 0.5, "lastOutcome": 0.3}
	- initProbs is optional. object mapping outcomes -> best estimated probability. Values must be probabilities that sum to 1.  
	*/

	// convert initProbs to stubbed bets
	let INITIAL_PROB_WEIGHT = 50;
	
	if (initProbs !== undefined)
	{
		let stubBets = [];
		for (let k in initProbs)
		{
			stubBets.push([k, initProbs[k] * INITIAL_PROB_WEIGHT]);
		}
		
		bets = stubBets.concat(bets);
	}


	let probs = probFromBets(bets);

	let impliedOdds = {};
	let numOutcomes = Object.keys(probs).length;
	for (let k in probs)
	{
		let p = probs[k] + vigorish / numOutcomes;
		impliedOdds[k] = probToMoneyline(p);
	}

	return impliedOdds;
}
