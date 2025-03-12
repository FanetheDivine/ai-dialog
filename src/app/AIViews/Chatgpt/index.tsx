import Image from 'next/image'
import { Typography } from 'antd'
import type { AIDialog, UserDialog } from '../withDialogWrapper'
import { withDialogWrapper } from '../withDialogWrapper'
import Gpt from './gpt.svg'

const UserDialog: UserDialog = (props) => {
  return (
    <Typography.Paragraph
      editable={{
        onChange: props.onChange,
        icon: props.hiddenEditIcon ? <span className='hidden'></span> : null,
      }}
      className=' self-end max-w-[70%] rounded-3xl bg-[hsla(0,0%,91%,.5)] px-5 py-2.5 mb-0'
    >
      {props.text}
    </Typography.Paragraph>
  )
}

const AIDialog: AIDialog = (props) => {
  return (
    <div className='flex gap-2'>
      <Image className='w-6 h-6' src={Gpt} alt='gpt'></Image>
      <Typography.Paragraph
        editable={{
          onChange: props.onChange,
          icon: props.hiddenEditIcon ? <span className='hidden'></span> : null,
        }}
        className='flex-auto'
      >
        {props.text}
      </Typography.Paragraph>
    </div>
  )
}

const Chatgpt = withDialogWrapper(UserDialog, AIDialog)

export default Chatgpt
