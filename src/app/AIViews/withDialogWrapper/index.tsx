import { FC, useCallback, useRef, useState } from 'react'
import {
  DeleteOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { useLocalStorageState } from 'ahooks'
import { Popover, Tour } from 'antd'
import classNames from 'classnames'
import { useEmojiPicker } from '@/app/utils/useEmojiPicker'
import { AIComponent } from '..'
import styles from './styles.module.css'

type DialogProps = {
  hiddenEditIcon?: Boolean
  text: string
  onChange: (newVal: string) => void
}

export type UserDialog = FC<DialogProps>
export type AIDialog = FC<DialogProps>

export function withDialogWrapper(
  UserDialog: UserDialog,
  AIDialog: AIDialog,
): AIComponent {
  return function Comp(props) {
    const { dialog, dispatch, hiddenEditIcon } = props
    const [openEmojiPicker] = useEmojiPicker()
    const [tourOpen, startTour, closeTour, tourDOMRef] = useTour()
    return (
      <>
        <div className='bg-white text-[14px]'>
          {dialog.map((item, index) => (
            <div
              ref={(el) => {
                if (el && index === 0) {
                  startTour(el)
                }
              }}
              key={item.key}
              className={classNames(
                { [styles.tour]: tourOpen && index === 0 },
                styles.dialog,
                'flex flex-col py-4 gap-4 pl-3 pr-4 relative',
              )}
            >
              <UserDialog
                hiddenEditIcon={hiddenEditIcon}
                text={item.user}
                onChange={(val) => dispatch.change(index, 'user', val)}
              ></UserDialog>
              <AIDialog
                hiddenEditIcon={hiddenEditIcon}
                text={item.ai}
                onChange={(val) => dispatch.change(index, 'ai', val)}
              ></AIDialog>
              <span className=' absolute top-1 left-1 flex gap-1'>
                <Popover content='在上面添加一段对话！'>
                  <PlusCircleOutlined
                    className={classNames(styles.icon, 'text-[#1677ff]')}
                    onClick={() => dispatch.insert(index)}
                  ></PlusCircleOutlined>
                </Popover>
                <Popover content='删除本段对话'>
                  <DeleteOutlined
                    className={classNames(styles.icon, 'text-[#f5222d]', {
                      hidden: dialog.length === 1,
                    })}
                    onClick={() => dispatch.delete(index)}
                  ></DeleteOutlined>
                </Popover>
              </span>
              <span className='absolute bottom-1 left-1 flex gap-1'>
                <Popover content='在下面添加一段对话！'>
                  <PlusCircleOutlined
                    className={classNames(styles.icon, 'text-[#1677ff]')}
                    onClick={() => dispatch.insert(index + 1)}
                  ></PlusCircleOutlined>
                </Popover>
                <Popover content='来点emoji！'>
                  <span
                    className={classNames(styles.icon, 'cursor-pointer')}
                    onClick={openEmojiPicker}
                  >
                    😋
                  </span>
                </Popover>
              </span>
            </div>
          ))}
        </div>
        <Tour
          open={tourOpen}
          closable={false}
          steps={[
            {
              title: (
                <span className='whitespace-nowrap'>在这里编辑对话！</span>
              ),
              target: tourDOMRef.current,

              nextButtonProps: { children: '懂了！', onClick: closeTour },
            },
          ]}
        ></Tour>
      </>
    )
  }
}

const useTour = () => {
  const [showTour, setShowTour] = useLocalStorageState('ai-dialog-showtour', {
    defaultValue: true,
  })
  const [tourOpen, setTourOpen] = useState(false)
  const tourDOMRef = useRef<HTMLDivElement>()
  const startTour = useCallback(
    (el?: HTMLDivElement) => {
      if (el && showTour) {
        tourDOMRef.current = el
        setTourOpen(true)
      }
    },
    [showTour],
  )
  const closeTour = useCallback(() => {
    setShowTour(false)
    setTourOpen(false)
  }, [setShowTour])
  return [tourOpen, startTour, closeTour, tourDOMRef] as const
}
