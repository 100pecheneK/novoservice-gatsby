import Konva from 'konva'
import React from 'react'
import { Image, Text, Transformer } from 'react-konva'

export default function ResizableText({
  isSelected,
  onSelect,
  onChange,
  text,
}) {
  const shapeRef = React.useRef()
  const trRef = React.useRef()
  React.useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current])
      trRef.current.getLayer().batchDraw()
    }
  }, [isSelected])
  return (
    <>
      <Text
        text={text.value}
        fontSize={text.fontSize}
        id={text.id}
        fill={text.color}
        ref={shapeRef}
        x={text.x}
        y={text.y}
        width={text.width}
        height={text.height}
        draggable
        onDragEnd={e => {
          onChange({
            ...text,
            x: e.target.x(),
            y: e.target.y(),
          })
        }}
        onTransformEnd={e => {
          const node = shapeRef.current
          const scaleX = node.scaleX()
          const scaleY = node.scaleY()

          node.scaleX(1)
          node.scaleY(1)
          onChange({
            ...text,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          })
        }}
        onClick={onSelect}
        onTap={onSelect}
        draggable
      />

      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox
            }
            return newBox
          }}
        />
      )}
    </>
  )
}
