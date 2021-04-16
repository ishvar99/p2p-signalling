let trxList=document.getElementById('trx-list');
let newTableBody=document.getElementById('new-trx-body');
let openTableBody=document.getElementById('open-trx-body');
let serviceTableBody=document.getElementById('services-body');
let serviceSubmitForm=document.getElementById('form-submit');
let info;
let urlParams = new URLSearchParams(window.location.search);
let branch = urlParams.get('branch');
let services;
let trxData;
let currentTrxId;
serviceSubmitForm.addEventListener('submit',async(e)=>{
   e.preventDefault();
   let selectExecutive=document.getElementById('select-executive')
   let transactionNote=document.getElementById('transaction-note');
   trxData[currentTrxId]['tr-exe-name']=selectExecutive.value;
   trxData[currentTrxId]['tr-process-note']=transactionNote.value
   await updateExistingFile('transactions.json',JSON.stringify(trxData[currentTrxId]));
   loadNewTable();
   transactionNote.value=""
})
let peer = new Peer(branch,{
 host:location.hostname,
 port:location.port || (location.protocol === 'https:' ? 443 : 80),
 path:'/peerjs',
 debug:2
});
peer.on('open', (id)=> {
 console.log('My peer ID is: ' + id);
})
var connection =null;
peer.on('connection', (conn) => {
   console.log(conn.peer);
connection=peer.connect(conn.peer);
conn.on('open',()=>{
   console.log('connection opened')
conn.on('data',async (message)=>{
  let parsedMessage= JSON.parse(message);
  switch(parsedMessage.type){
     case 'GET':{
        let info={
           "data":services
        }
      connection.send(JSON.stringify(info));
      break;
     }
     case 'POST':{
      processTransaction(parsedMessage.data)
     }
     default:{
        console.log(message);
     }
  }
});
}) 
})
var sound = new Howl({
   src: ['/sent.mp3']
 });

const processTransaction=async(transaction)=>{
   transaction.type='new';
   let obj ={'cstmr-id':Math.random().toString(36).substr(2, 10),'acc-holder':transaction['acc-holder'],'acc-holder-name':transaction['acc-holder-name'],'transactions':[]};
   transaction=JSON.stringify(transaction)
   console.log(transaction)
await updateExistingFile('transactions.json',transaction)

await updateExistingFile('customers.json',JSON.stringify(obj))
loadNewTable();
}
var btn = document.getElementById('btn');
const accessFileSystem=async ()=>{
   await openFolder();
   await createNewFile('temp.json')
   services=await readFile('services.json')
   loadNewTable();
   loadOpenTable();
}
btn.addEventListener('click',accessFileSystem);


const declineButtonClicked=(e)=>{
   if(confirm(`Do you really want to decline this request?`)){
      trxData[e.value]['type']='complete';
      loadNewTable();
   }
}
const acceptButtonClicked= async (e)=>{
   console.log(e)
   if(!trxData[e.value]['tr-exe-name'] && !trxData[e.value]['tr-process-note']){
      alert('Please provide service executive and process note')
      return;
   }
      if(confirm(`Do you really want to accept this request?`)){
         try {            
            let trx= trxData[e.value];
            trx.type='open'
    await updateExistingFile('transactions.json',JSON.stringify(trx))
    loadNewTable();
    loadOpenTable();
    alert('Request accepted successfully!')
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

// create the table in the new transactions tab
const loadNewTable=async()=>{
   let fileData=await readFile('transactions.json');
   trxData=JSON.parse(fileData);
   newTableBody.innerHTML=""
   Object.values(trxData).forEach((trx)=>{
      if(trx.type==='new'){
      let trxRow=`<tr><td>${trx['tr-id']}</td>
      <td>${trx['start-ts']}</td>
      <td>${trx['acc-holder']}</td>
      <td>${trx['acc-holder-name']}</td>
      <td><button class='btn btn-warning' disabled title='${trx['tr-sugg']}'>Suggestion</button></td>
      <td>
      <button class='btn btn-primary' id='show-${trx['tr-id']}' onclick="showTransactionServices(this)" value="${trx['tr-id']}">Show</button>
      </td>
      <td>
      <button class="btn btn-success" onclick="acceptButtonClicked(this)" value="${trx['tr-id']}">✓</button>
      <span> </span><button class="btn btn-danger" onclick="declineButtonClicked(this)" value="${trx['tr-ids']}">⨉</button>
      </td>
      </tr>`;
      newTableBody.innerHTML+=trxRow;
      }
   })
}

// create the table in the open transactions tab
const loadOpenTable=async()=>{
   let fileData=await readFile('transactions.json');
   let trxData=JSON.parse(fileData);
   openTableBody.innerHTML=""
   Object.values(trxData).forEach((trx)=>{
      if(trx.type==='open'){
      console.log(trx);
      let trxRow=`<tr><td>${trx['tr-id']}</td>
      <td>${trx['acc-holder']}</td>
      <td>${trx['acc-holder-name']}</td>
      <td>${trx['tr-exe-name']}</td>
      <td>${trx['tr-process-note']}</td>
      <td><button class='btn btn-primary' title='transaction note'>Suggestion</button></td>
      </tr>`;
      openTableBody.innerHTML+=trxRow;
      }
   })
}
// Handle show services button click
const showTransactionServices=(transaction)=>{
   serviceTableBody.innerHTML=""
let trx =trxData[transaction.value];
currentTrxId=transaction.value;
trx.content.forEach((service)=>{
   let data=`<tr>
   <td>${service['id']}</td>
   <td>${service['service']}</td>
   <td>${service['service-details']}</td>
   </tr>`
   serviceTableBody.innerHTML+=data;
})
 $('#services-modal').modal('show');
  }


// Control tabs

  var triggerTabList = [].slice.call(document.querySelectorAll('#pills-tab a'))
triggerTabList.forEach(function (triggerEl) {
  var tabTrigger = new bootstrap.Tab(triggerEl)
console.log(tabTrigger);
  triggerEl.addEventListener('click', function (event) {
    event.preventDefault()
    console.log(event)
    tabTrigger.show()
  })
})
// conn.on('error',(err)=>{
//  console.log(err);
// })
// peer.on('error',(e)=>{
// console.log(e);
// })

// function extra(){
    // sound.play()
   // info=message
   // var main=document.createElement('div')
   // var li =document.createElement('li')
   // var span =document.createElement('span')
   // span.textContent=' '
   // var accept =document.createElement('button')
   // accept.addEventListener('click',acceptButtonClicked)
   // accept.textContent='accept'
   // accept.value=connection.peer+":"+message.split("?")[0]
   // var decline=document.createElement('button')
   // decline.addEventListener('click',declineButtonClicked)
   // decline.textContent='decline'
   // decline.value=connection.peer
   // li.textContent=`${message.split("?")[1]}: INR ${message.split("?")[0]} from Account Number ${connection.peer}`
   // main.appendChild(li);
   // main.appendChild(accept);
   // main.appendChild(span);
   // main.appendChild(decline)
   // trxList.appendChild(main)
   // trxList.appendChild(document.createElement('br'))
// }