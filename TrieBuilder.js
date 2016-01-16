var Fs = require('fs');
var Promise = require('promise');
var Trie = require("./Trie.js");

var TrieBuilder = function () {};

TrieBuilder.prototype.appendWord = function(trie,word){
	var state = trie.startState;
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
}

TrieBuilder.prototype.importFile = function(trie,filename){
	var vm = this;
	return new Promise(function (resolve, reject) {
		Fs.readFile(filename, 'utf8', function(err, contents) {
		    if(err){
		    	reject(err);
		    }else{
		    	var words = contents.split("\n");
		    	words.forEach(function(word){
					vm.appendWord(trie,word);
				})
		    	resolve(trie);	
		    }
		});
	});
}

TrieBuilder.prototype.create = function(wordFiles){
	var vm = this;

	function generateTrieBuilder(){
		var states = {
			"":{
				name:"ROOT",
				nextStates:{
				}
			},
		}

		var startState = states[""];
		var trie = (new Trie(states,startState))
		return trie;
	}
	
	var trie = generateTrieBuilder();
	return new Promise(function (resolve, reject) {
		
		var promises = [];
		wordFiles.forEach(function(wordFile){
			var p = vm.importFile(trie,wordFile);
			promises.push(p);
		})
		Promise.all(promises).then(function(){
			resolve(trie);
		},function(){
			reject("Cannot Construct Trie.");
		});
	});

	return 
};


module.exports = (new TrieBuilder);