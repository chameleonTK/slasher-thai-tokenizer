// var fs = require('fs');
// fs.readFile('word.text', 'utf8', function(err, contents) {
//     console.log(contents);
// });

var tokenizer = require("./Tokenizer.js");

tokenizer.tokenize({
	startState:"a",
	states:{
		"a":{
			name:"a",
			nextState:{}
		},
		"b":{
			name:"b",
			nextState:{
				"b":{
					name:"bb",
					nextState:{}
				}
			}
		},
	}
},"aabb");