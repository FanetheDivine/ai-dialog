import { FC, useCallback } from 'react'
import emojiData from '@angelofana/emoji-json'
import { App, Typography } from 'antd'

const emojiList = emojiData.map((item) => item.char)

const EmojiPicker: FC = () => {
  return (
    <div className='flex flex-wrap gap-2'>
      {emojiList.slice(0, 10).map((emoji) => {
        const emojiIcon = <span className='text-2xl'>{emoji}</span>
        return (
          <Typography.Paragraph
            key={emoji}
            copyable={{
              text: emoji,
              icon: [emojiIcon, emojiIcon],
            }}
          ></Typography.Paragraph>
        )
      })}
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
      title: '挑一个，点一下！',
      content: <EmojiPicker></EmojiPicker>,
    })
  }, [modal])
  return [openEmojiPicker] as const
}
