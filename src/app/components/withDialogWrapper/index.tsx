import { FC } from 'react'
import {
  DeleteOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { Popover } from 'antd'
import classNames from 'classnames'
import { EmojiPickerPopover } from '@/app/page'
import { AIDialogComp } from '..'
import styles from './styles.module.css'

type DialogProps = {
  text: string
  onChange: (newVal: string) => void
}

export type UserDialog = FC<DialogProps>
export type AIDialog = FC<DialogProps>

export function withDialogWrapper(
  UserDialog: UserDialog,
  AIDialog: AIDialog,
): AIDialogComp {
  return function Comp(props) {
    const { dialog, dispatch } = props
    return (
      <div className='bg-white text-[14px]'>
        {dialog.map((item, index) => (
          <div
            key={item.key}
            className={classNames(
              styles.dialog,
              'flex flex-col py-4 gap-4 pl-3 pr-4 relative',
            )}
          >
            <UserDialog
              text={item.user}
              onChange={(val) => dispatch.change(index, 'user', val)}
            ></UserDialog>
            <AIDialog
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
              <EmojiPickerPopover>
                <span className={classNames(styles.icon)}>😋</span>
              </EmojiPickerPopover>
            </span>
          </div>
        ))}
      </div>
    )
  }
}
