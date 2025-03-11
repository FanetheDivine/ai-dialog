import { FC, useCallback } from 'react'
import emojiData from '@angelofana/emoji-json'
import { App, Typography } from 'antd'

const emojiList = emojiData.map((item) => item.char)

const EmojiPicker: FC = () => {
  return (
    <div className='flex flex-wrap gap-2'>
      {emojiList.slice(0, 10).map((emoji) => (
        <span key={emoji} className='flex'>
          <span className='text-2xl'>{emoji}</span>
          <Typography.Paragraph
            className=''
            copyable={{ text: emoji }}
          ></Typography.Paragraph>
        </span>
      ))}
    </div>
  )
}

export const useEmojiPicker = () => {
  const { modal } = App.useApp()
  const openEmojiPicker = useCallback(() => {
    modal.info({
      maskClosable: true,
      closable: true,
      footer: null,
      icon: null,
      title: '挑一个吧！',
      content: <EmojiPicker></EmojiPicker>,
    })
  }, [modal])
  return [openEmojiPicker] as const
}
