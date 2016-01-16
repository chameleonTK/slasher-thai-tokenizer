var Fs = require('fs');
var Promise = require('promise');

var Trie = function (states,startState) {
	this.states = states;
	this.startState = startState;
};

Trie.prototype.getNextState = function(currentState,nextInput){

	if( currentState.nextStates.hasOwnProperty(nextInput)){
		return currentState.nextStates[nextInput];
	}

	return false;
};


module.exports = (Trie);