const http = require("http");
global.Ccc = require("./index.js");
// var mysql = require("mysql");

const port = 7777;
const host = '127.0.0.1'

const server = http.createServer((req , res) => {
	// global.response = res;
	Ccc.prepareResponse(req,res);

});


server.listen(port , host , () => {
	console.log(`server is running on host ${host} on port ${port}`);
});


