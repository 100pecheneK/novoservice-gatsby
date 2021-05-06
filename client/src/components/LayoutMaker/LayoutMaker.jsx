import { nanoid } from 'nanoid'
import React, { useEffect, useState, useRef } from 'react'
import { Layer, Stage } from 'react-konva'
import './LayoutMaker.css'
import BackgroundImage from './BackgroundImage'
import LayoutImage from './LayoutImage'
import ResizableImage from './ResizableImage'

const settings = {
  initialResizeImage: {
    x: 0,
    y: 0,
  },
}

// type LayoutMakerProps = {
//   onExport: () => void
//   backgroundImage: string
//   layoutImage: string
// }: LayoutMakerProps
export default function MaketMaker({ onExport, backgroundImage, layoutImage }) {
  const [stageWidth, setStageWidth] = useState(0)
  const [stageHeight, setStageHeight] = useState(0)
  const [selectedId, selectShape] = useState(null)
  const [files, setFiles] = useState([])
  const [orderInputs, setOrderInputs] = useState([nanoid()])
  const [isExporting, setIsExporting] = useState(false)
  const stageRef = useRef(null)
  const stageContainerRef = useRef(null)
  const [maxStageWidth, setMaxStageWidth] = useState(0)
  useEffect(() => {
    if (!stageContainerRef.current) return
    const stageContainerStyle = window.getComputedStyle(
      stageContainerRef.current,
      null
    )
    setMaxStageWidth(
      stageContainerStyle.width.substring(
        0,
        stageContainerStyle.width.length - 2
      )
    )
  }, [stageContainerRef])

  function checkDeselect(e) {
    if (e.target?.attrs?.name === 'bg') {
      selectShape(null)
    }
  }
  function moveForward(e) {
    const id = e.target.id()
    setFiles(prevFiles => {
      const file = prevFiles.find(f => f.id === id)
      const fileIndex = prevFiles.indexOf(file)
      return [
        ...prevFiles.slice(0, fileIndex),
        ...prevFiles.slice(fileIndex + 1),
        file,
      ]
    })
  }
  function onInputChange(e, orderNumber) {
    // get file from input
    const file = e.target.files[0]
    // if file input cancel then delete them
    if (!file) {
      deleteFileByOrderNumber(orderNumber)
      return
    }
    const reader = new FileReader()

    // check if file exist
    const fileAlreadyExist = files.find(f => f.orderNumber === orderNumber)

    if (fileAlreadyExist) {
      reader.onload = () => {
        const img = new window.Image()
        img.src = reader.result
        // replace prevfile by newfile
        setFiles(prevFiles =>
          prevFiles.map(prevFile => {
            if (prevFile.orderNumber === orderNumber) {
              return {
                ...prevFile,
                orderNumber,
                x: settings.initialResizeImage.x,
                y: settings.initialResizeImage.y,
                img: img,
                name: file.name,
                file: reader.result,
              }
            }
            return prevFile
          })
        )
      }
    } else {
      reader.onload = () => {
        const img = new window.Image()
        img.src = reader.result
        // append new file
        setFiles(prev => [
          ...prev,
          {
            orderNumber,
            x: settings.initialResizeImage.x,
            y: settings.initialResizeImage.y,
            img: img,
            id: nanoid(),
            name: file.name,
            file: reader.result,
          },
        ])
      }
      setOrderInputs(prev => [...prev, nanoid()])
    }
    reader.readAsDataURL(file)
  }
  function deleteFileByOrderNumber(orderNumber) {
    setFiles(prevFiles => prevFiles.filter(f => f.orderNumber !== orderNumber))
    setOrderInputs(prev => prev.filter(o => o !== orderNumber))
  }

  function handleExport() {
    selectShape(null)
    setIsExporting(true)
  }
  function exportStageToPng() {
    const exported = [
      {
        type: 'layout',
        file: stageRef.current.toDataURL(),
        name: 'layout.png',
      },
      ...files.map((file, i) => ({
        type: 'asset',
        file: file.file,
        name: `${i}-${file.name}`,
        width: file.width,
        height: file.height,
        x: file.x,
        y: file.y,
      })),
    ]
    onExport(exported)
  }
  useEffect(() => {
    if (!isExporting) return
    exportStageToPng()
    setIsExporting(false)
  }, [isExporting])

  return (
    <div>
      <button
        onClick={handleExport}
        className='mt-2 text-white w-full py-1 px-2 bg-green-500 rounded border border-green-600 focus:outline-none focus:ring-1 hover:bg-green-600'
      >
        Купить
      </button>
      <div className='grid grid-cols-2 gap-1 inputs'>
        {orderInputs
          .slice(0)
          .reverse()
          .map(orderNumber => {
            const currentFile = files.find(f => f.orderNumber === orderNumber)
            return (
              <div key={orderNumber} className='grid gap-1 py-2 px-0'>
                <input
                  accept='image/*'
                  type='file'
                  id={`input-file-${orderNumber}`}
                  onChange={e => onInputChange(e, orderNumber)}
                  style={{ display: 'none' }}
                />
                <label
                  htmlFor={`input-file-${orderNumber}`}
                  className='cursor-pointer relative w-full bg-white border border-gray-300 rounded-md shadow-sm px-3 py-2 text-left grid gap-1'
                >
                  {!currentFile?.name && 'Выберите файл'}
                  {currentFile && (
                    <img
                      className='input-file-preview w-full h-auto'
                      src={currentFile.img.src}
                      alt={currentFile.name}
                    />
                  )}
                  {currentFile && (
                    <button
                      className='text-white w-full self-end max-h-9 py-1 px-2 bg-red-500 rounded border border-red-600 focus:outline-none focus:ring-1 hover:bg-red-600'
                      onClick={() => deleteFileByOrderNumber(orderNumber)}
                    >
                      Удалить
                    </button>
                  )}
                </label>
              </div>
            )
          })}
      </div>

      <div className='flex justify-center' ref={stageContainerRef}>
        <Stage
          ref={stageRef}
          width={stageWidth}
          height={stageHeight}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          name='bg'
          style={{ border: '1px solid black' }}
        >
          <Layer layerName='background'>
            <BackgroundImage
              width={stageWidth}
              height={stageHeight}
              imageUrl={backgroundImage}
            />
          </Layer>
          <Layer layerName='resizableImages'>
            <LayoutImage
              name='bg'
              setStageHeight={setStageHeight}
              setStageWidth={setStageWidth}
              imageUrl={layoutImage}
              maxWidth={maxStageWidth}
            />
            {files.map((file, i) => {
              return (
                <ResizableImage
                  stageHeight={stageHeight}
                  stageWidth={stageWidth}
                  key={file.id}
                  file={file}
                  isSelected={file.id === selectedId}
                  onSelect={e => {
                    moveForward(e)
                    selectShape(file.id)
                  }}
                  onChange={newAttrs => {
                    setFiles(prevFiles => {
                      return prevFiles.map(f => {
                        if (f.id === newAttrs.id) {
                          return { ...f, ...newAttrs }
                        }
                        return f
                      })
                    })
                  }}
                />
              )
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  )
}