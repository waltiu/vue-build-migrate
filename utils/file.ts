import * as fs from 'fs'

const BASE_PATH = process.cwd()

export async function getFile(fileName: string): Promise<any> {
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

export async function saveFile(fileName: string, fileContents: string): Promise<any> {
  return await new Promise((resolve, reject) => {
    try {
      fs.writeFileSync(BASE_PATH + fileName, fileContents)
      resolve('OK')
    } catch (e) {
      reject(e)
    }
  })
}

export async function removeFile(fileName: string): Promise<any> {
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

export async function copyFile(source: string, destination: string): Promise<any> {
  return await new Promise((resolve, reject) => {
    try {
      fs.copyFileSync(BASE_PATH + source, BASE_PATH + destination)
      resolve('OK')
    } catch (e) {
      reject(e)
    }
  })
}
