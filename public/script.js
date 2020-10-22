let peerId=document.getElementById('peerId');
let form =document.getElementById('connect');
let form2 =document.getElementById('chat')
let inputField=document.getElementById('text')
let list=document.getElementById('msg-list');
let peer = new Peer(undefined,{
  host:'/',
  port:'4000'
}); 
let conn=null;
 peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
  document.querySelector('.userId').innerHTML += id;
})

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const id = peerId.value;
  conn = peer.connect(id);
  
  conn.on('open', () => {
    form.style.display='none';
    form2.style.visibility='visible'
      console.log('connected to peer', id);
  });
})
peer.on('connection', (conn) => {
  conn.on('data', displayMessage);
 });

form2.addEventListener('submit',(e)=>{
  e.preventDefault();
  conn.send(inputField.value);
  var li =document.createElement('li');
  li.textContent=inputField.value;
  list.appendChild(li);
  inputField.value="";
})
 
var displayMessage=(message)=>{
  var li =document.createElement('li')
  li.textContent=message;
  list.appendChild(li);
}