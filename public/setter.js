let trxList=document.getElementById('trx-list')
let info;
let peer = new Peer('setter',{
 host:location.hostname,
 port:location.port || (location.protocol === 'https:' ? 443 : 80),
 path:'/peerjs',
 debug:2
});
var sound = new Howl({
   src: ['/sent.mp3']
 });
var btn = document.getElementById('btn');
btn.addEventListener('click',async (_)=>{
 await openFolder();
 await createNewFile('transactions.txt')
})
peer.on('open', async function(id) {
 console.log('My peer ID is: ' + id);
})
var connection =null;
peer.on('connection', (conn) => {
connection=peer.connect(conn.peer);
conn.on('open',()=>{
conn.on('data',async (message)=>{
   sound.play()
   info=message
   var main=document.createElement('div')
   var li =document.createElement('li')
   var span =document.createElement('span')
   span.textContent=' '
   var accept =document.createElement('button')
   accept.addEventListener('click',acceptButtonClicked)
   accept.textContent='accept'
   accept.value=connection.peer+":"+message.split("?")[0]
   var decline=document.createElement('button')
   decline.addEventListener('click',declineButtonClicked)
   decline.textContent='decline'
   decline.value=connection.peer
   li.textContent=`${message.split("?")[1]}: INR ${message.split("?")[0]} from Account Number ${connection.peer}`
   main.appendChild(li);
   main.appendChild(accept);
   main.appendChild(span);
   main.appendChild(decline)
   trxList.appendChild(main)
   trxList.appendChild(document.createElement('br'))

});
})
const declineButtonClicked=(e)=>{
   if(confirm(`Do you really want to decline this request?`)){
      e.target.parentElement.remove();
   }
}
const acceptButtonClicked= async (e)=>{
   console.log(e)
      if(confirm(`Do you really want to accept this request?`)){
         try {
   //  const fileData=await readFile('amount.txt')
    await updateExistingFile('transactions.txt',e.target.parentElement.firstElementChild.textContent)
    alert(`${e.target.parentElement.firstElementChild.textContent.split(':')[0]} request accepted successfully!`)
    e.target.parentElement.remove();
   //  connection.send('transaction successful!')
   } 
   catch (error) 
   {
      console.log(error)
      alert('Failed to process request! Something went wrong')
      // connection.send('transaction failed!')
   }
      

   }
}
conn.on('error',(err)=>{
 console.log(err);
})
});
peer.on('error',(e)=>{
console.log(e);
})