var express = require('express')
var path=require('path');

var app=express();
app.use(express.static("public"))
app.get('/', (req, res) => {
  res.sendFile('client.html',{  root: path.join(__dirname,'/public')});
});
app.listen(3000, () => {
  console.log('listening on PORT 3000');
});


