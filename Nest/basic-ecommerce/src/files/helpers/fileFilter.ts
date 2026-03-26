export const FileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
  if (!file) return callback(new Error('No file provided'), false)

  const fileExtension = file.mimetype.split('/')[1]
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'avif'];
  if (!allowedExtensions.includes(fileExtension)) return callback(null, false)

  callback(null, true)
}