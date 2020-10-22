var express = require('express')
var path =require('path')
var app=express();
app.use(express.static(path.join(__dirname+"/public")))
app.get('/', (req, res) => {
  res.sendFile('main.html',{  root: path.join(__dirname,'/public')});
});
app.listen(5000, () => {
  console.log('listening on 5000');
});