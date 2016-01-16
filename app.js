
var trieBuilder = require("./TrieBuilder.js");
var tokenizer = require("./Tokenizer.js");

trieBuilder.create('SubWord.text')
.then(function(trie) {
	console.log(trie);	
	// var tokens = tokenizer.tokenize(finiteAutomata,"aabb");
	
},function(err){
	console.log(err);
})

