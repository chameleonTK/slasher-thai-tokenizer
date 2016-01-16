
var trieBuilder = require("./TrieBuilder.js");
var tokenizer = require("./Tokenizer.js");

trieBuilder.create('SubWord.text')
.then(function(trie) {
	var tokens = tokenizer.tokenize(trie,"aabb");
	console.log(tokens);
},function(err){
	console.log(err);
})

