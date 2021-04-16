var express = require('express')
var app=express()
var server = require('http').createServer(app);
var path=require('path');
const ExpressPeerServer = require('peer').ExpressPeerServer;
var peerserver = ExpressPeerServer(server,{debug:true});
app.use(express.static(__dirname + '/public' ));
app.use('/peerjs', peerserver);
//peer
app.get('/', (req, res) => {
  res.sendFile('getter.html',{  root: path.join(__dirname,'/public')});
});
// server
app.get('/cashier', (req, res) => {
  res.sendFile('cashier.html',{  root: path.join(__dirname,'/public')});
});

server.listen(process.env.PORT||3000, () => {
  console.log('Server is up and running!');
});


