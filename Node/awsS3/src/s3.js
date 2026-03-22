import { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_PUBLIC_KEY, AWS_SECRET_KEY } from './config.js'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import fs from 'node:fs'

const client = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_PUBLIC_KEY,
    secretAccessKey: AWS_SECRET_KEY
  }
})

// Enviar imagenes al servidor
export async function uploadFile (file) {
  const stream = fs.createReadStream(file.tempFilePath)

  const command = new PutObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: file.name,
    Body: stream
  })

  return await client.send(command)
}

// Obtener todos los archivos 
export async function getFiles (file) {
  const command = new ListObjectsCommand({
    Bucket: AWS_BUCKET_NAME,
  })

  return await client.send(command)
}
// Obtener imagen por nombre
export async function getFileForKey (filename) {
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: filename
  })

  return await client.send(command)
}
// Obtener imagen por nombre
export async function downloadFile (filename) {
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: filename
  })

  const result = await client.send(command)
  console.log(result)
  result.Body.pipe(fs.createWriteStream(`./images/${filename}.jpeg`))
}

export async function getFileURL (filename) {
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: filename
  })
  return await getSignedUrl(client, command, { expiresIn: 3600 })
}