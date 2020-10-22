
let peer = new Peer('main-server',{
 host:'/',
 port:'4000',
 path:'/peerjs'
}); 
peer.on('open', function(id) {
 console.log('My peer ID is: ' + id);
})
peer.on('connection', (conn) => {
 conn.on('data',(message)=>{
  console.log(message);
 });
});
