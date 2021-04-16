// let form=document.getElementById('account')
// let form2 =document.getElementById('chat')
// let inputField=document.getElementById('text')
// let list=document.getElementById('msg-list');
// let element=document.getElementById('element');
// let para =document.getElementById('para')
// let accno=document.getElementById('accno')
// let serviceDiv=document.getElementById('services')
// let service;
let serviceDiv=document.getElementById('services')
let personalDataForm=document.getElementById('personal-data')
let serviceForm =document.getElementById('service-form')
let serviceDetailsForm =document.getElementById('service-details-form')
let fetchServiceButton =document.getElementById('fetch-services')
let submitButton =document.getElementById('submit-transaction')
let userData={type:"POST",data:{"tr-id":null,"acc-holder":null,
"acc-holder-name":null,
"start-ts":null,
"approve-ts":null,
"complete-ts":null,content:[]}};
let services;
let peer = new Peer(undefined,{
  host:location.hostname,
  port: location.port || (location.protocol === 'https:' ? 443 : 80),
path:'/peerjs',
debug:2
}); 
let conn=null;

const processData=(data)=>{
  let parsedData=JSON.parse(data)
  console.log(data)
  services=JSON.parse(parsedData.data);
  serviceDiv.style.display=''
  let radioButtons= displayServices(services)
  radioButtons.forEach((radio)=>{
    serviceForm.innerHTML+=radio
  })
  fetchServiceButton.style.display='none'
  toggleLoader('hide');
  submitButton.style.display=''
 }
 const personalDataFormHandler=(e)=>{
   e.preventDefault();
   document.querySelector('#collapseOne').classList.remove('show')
   document.querySelector('#collapseTwo').classList.add('show')
   const formData = new FormData(e.target);
  const jsonData= JSON.stringify(Object.fromEntries(formData));
  userData['data']={...userData['data'],...JSON.parse(jsonData)};
console.log(userData);
 }
 const clearForms=()=>{
   personalDataForm.reset();
   serviceForm.reset();
   document.getElementById('transaction-note').value=""
userData={type:"POST",data:{"tr-id":null,"acc-holder":null,
"acc-holder-name":null,
"start-ts":null,
"approve-ts":null,
"complete-ts":null,content:[]}};
 }
//  const serviceFormHandler=(e)=>{
//    console.log(e);
//    e.preventDefault();
//    if(confirm('Are you sure?')){
//    const formData = new FormData(e.target);
//    console.log(formData)
//   const jsonData= Object.fromEntries(formData);
//   userData['data']={...userData['data'],id:Date.now(),...JSON.parse(jsonData)};
//   console.log(userData)
//   establishConnection(userData,false);
//   clearForms();
//    }
//  }
 const serviceDetailsFormHandler=(e)=>{
   e.preventDefault();
      const jsonData1= Object.fromEntries(new FormData(serviceForm));
      const jsonData2=Object.fromEntries(new FormData(e.target));
      jsonData1.id=document.querySelector('input[name="service"]:checked').id;
      const jsonData={...jsonData1,...jsonData2}
      userData['data']['content'].push(jsonData)
      userData['data']['start-ts']=Date.now();
      userData['data']['tr-id']=Math.random().toString(36).substr(2, 10);
      console.log(userData)  
      alert('service added successfully')
      serviceForm.reset();
      serviceDetailsForm.reset();
      document.getElementById('service-details-button').disabled=true;
 }
 const displayServices=(services)=>{
   let arr=[];
   if(services){
     services.forEach((service)=>{
      arr.push(`<input type="radio" id="${service['srv-id']}" checked name="service" value="${service['srv-title']}">
      <label>${service['srv-title']}</label><br>`)
     })
     return arr;
   }
 }
const fetchServiceListener=()=>{
  let message={
    "type":'GET',
    "data":"fetch branch services"
  }
  establishConnection(message);
}
const submitTransaction=()=>{
  let trxNote=document.getElementById('transaction-note').value;
  if(!trxNote){
    alert('Please add a transaction note')
    return;
  }
  userData['data']['tr-sugg']=trxNote;
  if(!userData['data']['acc-holder-name']&&!userData['data']['acc-holder']){
    alert('Please complete the personal details!')
  }
  else if(userData['data']['content'].length==0){
    alert('Please add a service!')
  }
  else{
  if(confirm('Are you sure?')){
    establishConnection(userData,false);
    clearForms();
  }
}
}
  const establishConnection=(data,showLoader=true)=>{
    console.log(data)
    if(showLoader)
    toggleLoader('show')
    conn =peer.connect(branch)
    conn.on('open', () => {
      console.log('Successful Connection!')
      if(data){
      conn.send(JSON.stringify(data));
      }
    });
  }
  const checkServiceForm=(e)=>{
    let btn= document.getElementById('service-details-button')
        if (e.value != '') {
            btn.disabled = false;
        }
        else {
            btn.disabled = true;
        }
  }
  const checkTransactionNotefrom=(e)=>{
    let btn= document.getElementById('service-details-button')
        if (e.value != '') {
            btn.disabled = false;
        }
        else {
            btn.disabled = true;
        }
  }
  const checkPersonalForm=()=>{
    let btn=document.getElementById('personal-data-button');
    var ele = document.getElementsByClassName('personal-data-field'); 
    for (i = 0; i < ele.length; i++) {
        if (ele[i].value == '') {
            btn.disabled = true;    
            return false;
        }
        else {
            btn.disabled = false;   
        }
    }
  }
 const toggleLoader=(msg)=>{
   if(msg=='show')
   loader.style.display=''
   else if(msg=='hide')
   loader.style.display='none'
 }
personalDataForm.addEventListener('submit',personalDataFormHandler)
serviceDetailsForm.addEventListener('submit',serviceDetailsFormHandler)
submitButton.addEventListener('click',submitTransaction)
let urlParams = new URLSearchParams(window.location.search);
let loader=document.getElementById('loader');

let branch = urlParams.get('branch');





fetchServiceButton.addEventListener('click',fetchServiceListener)


peer.on('open', function(id) {
  console.log('My peer ID is: ' + id);
})
peer.on('connection', (conn) => {
  conn.on('data',processData);
 });
// form.addEventListener('submit',(e)=>{
//   e.preventDefault();
//   if(accno.value)
//   {
//   document.querySelector('.userId').style.visibility='visible';
//   serviceDiv.style.visibility='visible'
//   form.style.display='none';


  
//   form2.addEventListener('submit',(e)=>{
//     e.preventDefault();
//     if(inputField.value){
//     if(confirm(`Are you sure, you want to ${service} INR ${inputField.value}?`)){
//       try {
//         conn =peer.connect(branch);
//         conn.on('open', () => {
//           conn.send(inputField.value+"?"+service);
//           inputField.value="";
//           alert(`${service} request send successfully!`)
//       });
//       } catch (error) {
//         alert('Something went wrong! Please try after sometime...')
//       }
// }
//     }
//   })

  // const displayMessage=(message)=>{
  //   console.log(message);
  //   element.textContent=message;
  // }
  // serviceForm.addEventListener('submit',(e)=>{
  //   e.preventDefault();
  //   serviceDiv.style.display='none';
  //   form2.style.visibility='visible'
  //   for(let element of e.target){
  //     if(element.type=="radio"){
  //       if(element.checked){
  //         service=element.value
  //       }
  //     }
  //   }
  // })
// }
// })
