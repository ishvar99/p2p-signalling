let folder,file;
const kfileName='transactions.txt'
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
  
  async function updateExistingFile(fileName, data){
     let fileHandle = await folder.getFileHandle(fileName)
     var fileData=await readFile(kfileName)
     let writable = await fileHandle.createWritable();
     await writable.write(data+"\n"+fileData);
     await writable.close();
     }
  
     async function readFile(fileName){
      let fileHandle=await folder.getFileHandle(fileName)
      let file =await fileHandle.getFile()
      let contents=await file.text()
      return contents;
     }