var express = require('express')
var app=express()
var server = require('http').createServer(app);
var path=require('path');
const ExpressPeerServer = require('peer').ExpressPeerServer;
var peerserver = ExpressPeerServer(server);
app.use(express.static(__dirname + '/' ));
app.set("view engine", "ejs")
app.use('/peerjs', peerserver);
//peer
app.get('/', (req, res) => {
  res.render('getter',{port:process.env.PORT});
});
// server
app.get('/setter', (req, res) => {
  res.render('setter',{port:process.env.PORT});
});

server.listen(process.env.PORT||3000, () => {
  console.log('Server listening on PORT 3000');
});


