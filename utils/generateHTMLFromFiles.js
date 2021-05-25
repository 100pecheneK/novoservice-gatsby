function generateHTMLFromOrderForFiles(files) {
  return files
    .map(
      ({ filename, width, height, x, y }) =>
        `<b>Имя:</b> ${filename}<br>Ширина: ${width}<br>Высота: ${height}<br>` +
        (x ? `x: ${x}<br>` : '') +
        (y ? `y: ${y}<br>` : '')
    )
    .join('')
}

module.exports = generateHTMLFromOrderForFiles
