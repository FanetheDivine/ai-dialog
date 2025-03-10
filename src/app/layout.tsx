import { FC, PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import { AntdProvider } from '@/lib/AntdProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI对话框截图生成器',
  description:
    'AI对话框截图生成器，制作表情包！生成deepseek等AI的对话框截图，支持宽度调整、在线图片编辑，可以选择emoji！',
  keywords: [
    'AI',
    'deepseek',
    'chatgpt',
    'kimi',
    'emoji',
    '表情包',
    '元宝',
    '通义灵码',
    '元神',
    '圆神',
    '猿神',
    '源神',
    '原神',
    '启动',
    '布兰卡',
  ],
}

const RootLayout: FC<PropsWithChildren> = (props) => {
  return (
    <html lang='zh-CN'>
      <body>
        <AntdProvider>{props.children}</AntdProvider>
      </body>
    </html>
  )
}

export default RootLayout
