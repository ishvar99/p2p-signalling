var express = require('express')
const ExpressPeerServer = require('peer').ExpressPeerServer;
var app=express();
var options = {
 debug: true
}
var server = require('http').createServer(app);
var peerserver = ExpressPeerServer(server, options);
app.use(express.static(__dirname + '/' ));
app.use('/peerjs', peerserver);
server.listen(4000);
