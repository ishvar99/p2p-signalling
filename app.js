var express = require('express')
var app=express()
var server = require('http').createServer(app);
var path=require('path');
const ExpressPeerServer = require('peer').ExpressPeerServer;
var peerserver = ExpressPeerServer(server);

app.use(express.static(__dirname + '/' ));
app.use('/peerjs', peerserver);
//peer
app.get('/', (req, res) => {
  res.sendFile('getter.html',{  root: path.join(__dirname,'/public')});
});
// server
app.get('/setter', (req, res) => {
  res.sendFile('setter.html',{  root: path.join(__dirname,'/public')});
});

server.listen(process.env.PORT||3000, () => {
  console.log('Server listening on PORT 3000');
});


