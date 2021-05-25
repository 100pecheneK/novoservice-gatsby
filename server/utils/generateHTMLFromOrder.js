function generateHTMLFromOrder(
  { email, phone, fielsInfoHtml, name, productId, productTitle, size },
  account,
  id
) {
  return `<h1>Заказ ${account}</h2>
		<h2>Код оплаты: ${id}</h2>
		<b>Имя: </b>${name}<br>
		<b>Почта: </b>${email}<br>
		<b>Номер телефона: </b>${phone}<br>
		<b>Название товара: </b>${productTitle}<br>
		<b>Идентификатор товара: ${productId}</b><br>
		<b>Размер товара: ${size}</b><br>
		<h2>Информация о файлах</h2>
		${fielsInfoHtml}`
}

module.exports = generateHTMLFromOrder
