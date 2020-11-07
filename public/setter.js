
let peer = new Peer('setter',{
 host:'/',
 port:PORT||'3000',
 secure:true,
 path:'/peerjs',
 debug:2
});
// var logs=document.getElementById('logs')
peer.on('open', function(id) {
 console.log('My peer ID is: ' + id);
})
var connection =null;
peer.on('connection', (conn) => {
 var li=document.createElement('li')
 li.textContent=`connection made with peer ${conn.peer}`
 connection=peer.connect(conn.peer);
 console.log('line 1 runs')
// conn.send(message+"abcd"); This does not work
// logs.appendChild(li);
// connection.send("ishan varshney");
conn.on('open',()=>{
 conn.on('data',(message)=>{
  console.log('line 2 runs')
  connection.send(message+"abcd")
 });
})

conn.on('error',(err)=>{
 console.log(err);
})
});
peer.on('error',(e)=>{
console.log(e);
})