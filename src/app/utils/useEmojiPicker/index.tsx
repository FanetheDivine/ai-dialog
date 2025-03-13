import { useCallback } from 'react'
import { App } from 'antd'
import { EmojiPicker } from './EmojiPicker'

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
