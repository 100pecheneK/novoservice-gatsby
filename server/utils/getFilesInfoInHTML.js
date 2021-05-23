function getFilesInfoInHTML(files) {
  return files
    .map(
      ({ filename, width, height, x, y }) =>
        `<ul><li><b>Имя:</b> ${filename}</li><li>Ширина: ${width}</li><li>Высота: ${height}</li>` +
        (x ? `<li>x: ${x}</li>` : '') +
        (y ? `<li>y: ${y}</li>` : '') +
        '</ul>'
    )
    .join('\n')
}

module.exports = getFilesInfoInHTML
