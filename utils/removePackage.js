import { getFile } from "./file.js"

export const removePackage =async ()=>{
  const file= await getFile('package.json')
  console.log(file,'file')
}

export default removePackage