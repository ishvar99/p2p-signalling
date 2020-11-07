let peerId=document.getElementById('peerId');
let form =document.getElementById('connect');
let form2 =document.getElementById('chat')
let inputField=document.getElementById('text')
let list=document.getElementById('msg-list');
let element=document.getElementById('element');
let para =document.getElementById('para')
console.log(`PORT ${PORT}`)
let peer = new Peer(undefined,{
  host:location.hostname,
  port: location.port || (location.protocol === 'https:' ? 443 : 80),
path:'/peerjs',
debug:2
}); 
let conn=null;
 peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
  document.querySelector('.userId').innerHTML += id;
})

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const id = peerId.value;
  conn = peer.connect(id,{reliable:true});
  
  conn.on('open', () => {
    form.style.display='none';
    form2.style.visibility='visible'
    para.style.visibility='visible';
      console.log('connected to peer', id);
  });
})
peer.on('connection', (conn) => {
  // console.log('connection');
  // console.log(conn);
  conn.on('data', displayMessage);
 });

form2.addEventListener('submit',(e)=>{
  e.preventDefault();
  conn.send(inputField.value);
  inputField.value="";
})
 
var displayMessage=(message)=>{
  console.log(message);
  element.textContent=message;
}