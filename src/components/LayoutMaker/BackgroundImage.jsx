import React from 'react'

import { Image, Text } from 'react-konva'
import useImage from 'use-image'

export default function BackgroundImage({
  width,
  height,
  imageUrl,
}) {
  const [image] = useImage(imageUrl, 'Anonymous')
  const [loading, setLoading] = React.useState(false)
  React.useEffect(() => {
    setLoading(false)
  }, [imageUrl])
  React.useEffect(() => {
    if (image) {
      setLoading(true)
    }
  }, [image, setLoading])
  if(!loading) return <Text text='Загрузка' fontSize={14}/>
  return <Image width={width} height={height} image={image} />
}
