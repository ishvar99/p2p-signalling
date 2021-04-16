let folder,file;
const openFolder = async() => {
 folder = await window.showDirectoryPicker();
 }
 async function createNewFile(fileName,data){
  let fileHandle = await folder.getFileHandle(fileName,{create:true});
  let writable = await fileHandle.createWritable();
  if(data){
   await writable.write(data);
  }
  writable.close();
  }
  
  async function updateExistingFile(fileName,data)
  {
     let fileHandle = await folder.getFileHandle(fileName)
     let fileData=await readFile(fileName)
     let obj={}
     if(fileData){
      obj=JSON.parse(fileData);
     }
     let parsedData=JSON.parse(data)
     if(parsedData['tr-id']){
     obj[parsedData['tr-id']]=parsedData;
     }
     if(parsedData['cstmr-id']){
      console.log(obj);
        obj[parsedData['cstmr-id']]=parsedData;
        console.log(obj);
     }
     console.log(obj);
     let writable = await fileHandle.createWritable();
     await writable.write(JSON.stringify(obj));
     await writable.close();
     }
  
     async function readFile(fileName){
      let fileHandle=await folder.getFileHandle(fileName)
      let file =await fileHandle.getFile()
      let contents=await file.text();
      return contents;
     }