import Image from 'next/image'
import { Typography } from 'antd'
import classNames from 'classnames'
import type { AIDialog, UserDialog } from '../withDialogWrapper'
import { withDialogWrapper } from '../withDialogWrapper'
import arrowdown from './arrowdown.svg'
import deepseek from './deepseek.svg'
import think from './think.svg'

const UserDialog: UserDialog = (props) => {
  return (
    <Typography.Paragraph
      editable={{
        onChange: props.onChange,
        icon: props.hiddenEditIcon ? <span className='hidden'></span> : null,
      }}
      className=' self-end max-w-[70%] rounded-3xl bg-[#EFF6FF] px-5 py-2.5 mb-0 text-base'
    >
      {props.text}
    </Typography.Paragraph>
  )
}

function isMobile() {
  return /Mobi|Android|iPhone|iPad|iPod|Phone/i.test(navigator.userAgent)
}
const AIDialog: AIDialog = (props) => {
  const needTranslate = !isMobile && props.hiddenEditIcon
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex gap-2 items-center'>
        <div className='w-7 h-7 p-0.5 rounded-full border border-solid border-[#d5e4ff]'>
          <Image
            className='w-full h-full'
            src={deepseek}
            alt='deepseek'
          ></Image>
        </div>

        <span className='bg-[#f5f5f5] rounded-xl py-1.5 px-3.5 flex items-center'>
          <Image className='w-3 h-3 mr-1.5' src={think} alt='think'></Image>

          <span
            className={classNames('text-xs', {
              '-translate-y-0.5': needTranslate,
            })}
          >
            已深度思考（用时{' '}
            <Typography.Paragraph
              editable={{
                onChange: props.onChangeExtra,
                icon: props.hiddenEditIcon ? (
                  <span className='hidden'></span>
                ) : null,
              }}
              className='inline text-xs'
            >
              {props.extra ?? '9'}
            </Typography.Paragraph>
            秒）
          </span>

          <Image
            className='w-2.5 h-2.5'
            src={arrowdown}
            alt='arrordown'
          ></Image>
        </span>
      </div>
      <Typography.Paragraph
        editable={{
          onChange: props.onChange,
          icon: props.hiddenEditIcon ? <span className='hidden'></span> : null,
        }}
        className='flex-auto ml-12 text-base'
      >
        {props.text}
      </Typography.Paragraph>
    </div>
  )
}

const DeepSeek = withDialogWrapper(UserDialog, AIDialog)

export default DeepSeek
