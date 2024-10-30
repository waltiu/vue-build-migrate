import * as fs from 'fs'

const BASE_PATH = process.cwd()

export async function getFile(fileName){
  console.log(fileName,'fileName')
  return await new Promise((resolve, reject) => {
    try {
      const file = fs.readFileSync(BASE_PATH + fileName, 'utf8')
      resolve(file)
    } catch (e) {
      reject(new Error('File not found'))
    }
  })
}

export async function saveFile(fileName, fileContents) {
  return await new Promise((resolve, reject) => {
    try {
      fs.writeFileSync(BASE_PATH + fileName, fileContents)
      resolve('OK')
    } catch (e) {
      reject(e)
    }
  })
}

export async function removeFile(fileName) {
  return await new Promise((resolve, reject) => {
    try {
      // check if file exists
      if (fs.existsSync(BASE_PATH + fileName)) {
        fs.unlinkSync(BASE_PATH + fileName)
        resolve('OK')
      }
    } catch (e) {
      reject(e)
    }
  })
}

export async function copyFile(source, destination) {
  return await new Promise((resolve, reject) => {
    try {
      fs.copyFileSync(BASE_PATH + source, BASE_PATH + destination)
      resolve('OK')
    } catch (e) {
      reject(e)
    }
  })
}
