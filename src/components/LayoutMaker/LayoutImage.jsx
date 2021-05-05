import React from 'react'

import { Image, Text } from 'react-konva'
import useImage from 'use-image'

export default function LayoutImage({
  name,
  setStageWidth,
  setStageHeight,
  imageUrl,
  maxWidth,
}) {
  const [image] = useImage(imageUrl, 'Anonymous')
  const [loading, setLoading] = React.useState(false)
  console.log('loading', loading)

  React.useEffect(() => {
    setLoading(false)
  }, [imageUrl])
  React.useEffect(() => {
    if (image) {
      setLoading(true)
    }
  }, [image, setLoading])

  React.useEffect(() => {
    if (image) {
      if (maxWidth < image.width) {
        image.height = image.height - (image.width - maxWidth) / (image.width / image.height)
        image.width = maxWidth
      }
      setStageHeight(image?.height || 0)
      setStageWidth(image?.width || 0)
    }
  }, [setStageHeight, setStageWidth, image])

  if (!loading) return <Text text='Загрузка' fontSize={14} />
  return <Image name={name} image={image} />
}
