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
					// "a":{
					// 	name:"a",
					// 	nextStates:{},
					// 	isFinalState:true,
					// },
					// "b":{
					// 	name:"b",
					// 	nextStates:{
					// 		"b":{
					// 			name:"bb",
					// 			nextStates:{},
					// 			isFinalState:true,
					// 		}
					// 	}
					// },
				}
			},
		}

		var startState = states[""];
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