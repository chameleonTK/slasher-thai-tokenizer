var Fs = require('fs');
var Promise = require('promise');
var Trie = require("./Trie.js");

var TrieBuilder = function () {};

TrieBuilder.prototype.create = function(wordFile){

	function generateTrieBuilder(words){
		var states = {
			"":{
				name:"ROOT",
				nextStates:{
				}
			},
		}

		var startState = states[""];

		words.forEach(function(word){
			var state = startState;
			var stateName = "";
			for (var i = 0; i < word.length; i++) {
				stateName += word[i];
				if(!state.nextStates.hasOwnProperty(word[i])){
					state.nextStates[word[i]] = {
						name: stateName,
						nextStates:{}
					}
				}

				state = state.nextStates[word[i]];
			}
			state.isFinalState = true;
		})

		return (new Trie(states,startState));
	}

	return new Promise(function (resolve, reject) {
		Fs.readFile(wordFile, 'utf8', function(err, contents) {
		    if(err){
		    	reject(err);
		    }else{
		    	var words = contents.split("\n");

		    	var trie = generateTrieBuilder(words);
		    	resolve(trie);	
		    }
		    
		});	
	});
};


module.exports = (new TrieBuilder);