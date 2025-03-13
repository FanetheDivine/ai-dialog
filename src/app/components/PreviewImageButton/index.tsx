'use client'

import { FC, ReactNode, useEffect, useId, useState } from 'react'
import {
  CheckCircleFilled,
  CopyOutlined,
  DownloadOutlined,
} from '@ant-design/icons'
import { App, Button } from 'antd'
import save from 'file-saver'
import html2canvas from 'html2canvas'
import { createRoot, Root } from 'react-dom/client'
import { AIView, AIViewProps } from '@/app/AIViews'
import { AntdProvider } from '@/lib/AntdProvider'

type PreviewImageButtonProps = Exclude<AIViewProps, 'hiddenEditIcon'> & {
  width: number
}
export const PreviewImageButton: FC<PreviewImageButtonProps> = (props) => {
  const containerRoot = useContainerRoot()
  const id = useId()

  const [loading, setLoading] = useState(false)
  const { modal } = App.useApp()
  const { width, dialog, dispatch, name } = props
  const onClick = async () => {
    if (!containerRoot) {
      throw new Error('未渲染画布')
    }
    setLoading(true)
    const view = (
      <AntdProvider>
        <div id={id} style={{ width }}>
          <AIView
            hiddenEditIcon
            dialog={dialog}
            dispatch={dispatch}
            name={name}
          ></AIView>
        </div>
      </AntdProvider>
    )
    getImage(containerRoot, view, id)
      .then((url) => {
        modal.info({
          icon: null,
          title: <CheckCircleFilled className='text-2xl text-[#52c41a]' />,
          closable: true,
          width: 700,
          content: (
            /* eslint-disable */
            <div
              style={{ boxShadow: '0 0 2px 1px #d9d9d9' }}
              className='w-full max-h-[50vh] overflow-y-auto rounded-lg'
            >
              <img className='box-border w-full' src={url}></img>
            </div>
            /* eslint-disable */
          ),
          okText: '下载',
          onOk: () => save(url, `ai-dialog-${props.name}-${Date.now()}.png`),
          okButtonProps: { type: 'primary', icon: <DownloadOutlined /> },
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <Button type='primary' loading={loading} onClick={onClick}>
      预览图片
    </Button>
  )
}

const useContainerRoot = () => {
  const [containerRoot, setContainerRoot] = useState<Root>()
  useEffect(() => {
    const divDom = document.createElement('div')
    divDom.style.position = 'absolute'
    divDom.style.top = '0'
    divDom.style.left = '0'
    divDom.style.width = '0'
    divDom.style.height = '0'
    divDom.style.overflow = 'hidden'
    document.body.appendChild(divDom)
    setContainerRoot(createRoot(divDom))
  }, [])
  return containerRoot
}

const getImage = async (root: Root, node: ReactNode, id: string) => {
  root.render(node)
  const imageDom = await new Promise<HTMLElement>((resolve, reject) => {
    let restCount = 300
    const timer = setInterval(() => {
      const dom = document.getElementById(id)
      if (dom) {
        clearInterval(timer)
        resolve(dom)
      } else {
        --restCount
        if (restCount === 0) {
          clearInterval(timer)
          reject(new Error('对话框未渲染'))
        }
      }
    }, 100)
  })
  return html2canvas(imageDom, { scale: 10 }).then((canvas) => {
    return new Promise<string>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(URL.createObjectURL(blob))
        } else {
          reject(new Error('canvas.toBlob失败'))
        }
      })
    })
  })
}
