import { downloadFile, getFileURL, getFiles, uploadFile } from './s3.js'
import fileUpload from 'express-fileupload'
import express from 'express'
const app = express()

// Middleware para la carga de los archivos
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir:'./uploads'
}))

// Menu raiz
app.get('/', (req, res) => {
  res.json({ message: 'Funciona prra' })
})

// Enviar archivo 
app.post('/files', async (req, res) => {
  // console.log(req.files.img)
  const result = await uploadFile(req.files.img)
  res.json(result)
})

// Imagenes
app.get('/imagenes', async (req, res) => {
  try {
    const result = await getFiles()
    console.log(result)

    res.status(200).json({ message: 'Se pudo!' })
  } catch (error) {
    res.status(500).json({ error })
  }
})

// Obtener imagenes a travez de un 'key'
app.get('/imagenes/:img', async (req, res) => {
  try {
    const { img } = req.params
    
    const result = await getFileURL(img)
    res.status(200).json({
      url: result
    })
  } catch (error) {
    res.status(500).json({ error })
  }
} )

app.get('/downloadfile/:img', async (req, res) => {
  const { img } = req.params
  await downloadFile(img)
  res.json({ message: 'Archivo descargado' })
})

app.listen(1234, () => {
  console.log(`Server on port 1234`)
})