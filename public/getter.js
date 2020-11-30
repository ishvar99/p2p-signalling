let form=document.getElementById('account')
let form2 =document.getElementById('chat')
let inputField=document.getElementById('text')
let list=document.getElementById('msg-list');
let element=document.getElementById('element');
let para =document.getElementById('para')
let accno=document.getElementById('accno')
let serviceForm =document.getElementById('service-form')
let serviceDiv=document.getElementById('services')
let service;
form.addEventListener('submit',(e)=>{
  e.preventDefault();
  if(accno.value)
  {
  document.querySelector('.userId').style.visibility='visible';
  serviceDiv.style.visibility='visible'
  form.style.display='none';
  let peer = new Peer(accno.value,{
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
  peer.on('connection', (conn) => {
    conn.on('data', displayMessage);
   });
  
  form2.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(inputField.value){
    if(confirm(`Are you sure, you want to ${service} INR ${inputField.value}?`)){
      try {
        conn =peer.connect('setter');
        conn.on('open', () => {
          conn.send(inputField.value+"?"+service);
          inputField.value="";
          alert(`${service} request send successfully!`)
      });
      } catch (error) {
        alert('Something went wrong! Please try after sometime...')
      }
}
    }
  })
  var displayMessage=(message)=>{
    console.log(message);
    element.textContent=message;
  }
  serviceForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    serviceDiv.style.display='none';
    form2.style.visibility='visible'
    for(let element of e.target){
      if(element.type=="radio"){
        if(element.checked){
          service=element.value
        }
      }
    }
  })
}
})
