function getFiles(uploadedFiles, data) {
  const files = []
  for (let i = 0; i < uploadedFiles.length; i++) {
    const file = uploadedFiles[i]
    const fileData = data[i]
    files.push({
      ...fileData,
      filename: fileData.name,
      path: file.path,
    })
  }
  return files
}

module.exports = getFiles
