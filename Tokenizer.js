var Tokenizer = function (debug) {
	var vm = this;
	vm.debug = debug;

};

Tokenizer.prototype.tokenize = function(trie,str){
	var failedPrev = [];
	for (var i = 0; i <=str.length; i++) {
		failedPrev.push({});
	};

	var index =0;
	var tokens = [];
	while(true){
		var bottomStack = { isBottomStack: true};
		var stack = [bottomStack];

		var state = trie.startState;
		var nextState = trie.getNextState(state,str[index]);
		if(this.debug){
			console.log("== forward ==");
			console.log("state: "+state.name);
		}
		while( index < str.length && nextState && !failedPrev[index][state.name]){
			stack.push(state);

			nextState = trie.getNextState(state,str[index]);
			state = nextState;

			index++;
			if(this.debug){
				console.log("state: "+state.name);
			}
		}

		if(this.debug){
			console.log("=== backtrack ===");
		}

		while(!state.isFinalState){
			failedPrev[index][state.name] = true;
			state = stack.pop()
			index--;
			if(state.isBottomStack){
				if(this.debug){
					console.log("Failure: Tokenization is impossible.");
				}
				break;
			}
		}

		tokens.push(state.name);
		if(index>=str.length){
			if(this.debug){
				console.log("Successful: Complete Tokenization.");
			}
			break;
		}
	}
	return tokens;
};


module.exports = (new Tokenizer());