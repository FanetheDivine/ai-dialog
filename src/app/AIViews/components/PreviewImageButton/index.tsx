'use client'

import { FC, ReactNode, useEffect, useId, useState } from 'react'
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
      .then((data) => {
        modal.success({
          title: '做好了！',
          closable: true,
          content: (
            /* eslint-disable */
            <img
              className='border border-dashed border-[#f5222d]'
              src={data}
              style={{ width }}
            ></img>
            /* eslint-disable */
          ),
          okText: '下载',
          onOk: () => save(data, 'ai-dialog.png'),
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
    divDom.style.position = ''
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
  return html2canvas(imageDom).then((canvas) => {
    return canvas.toDataURL()
  })
}
