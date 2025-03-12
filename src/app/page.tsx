'use client'

import {
  FC,
  PropsWithChildren,
  Suspense,
  useCallback,
  useMemo,
  useState,
} from 'react'
import {
  Button,
  InputNumber,
  Popover,
  Radio,
  Skeleton,
  Slider,
  Typography,
} from 'antd'
import classNames from 'classnames'
import { useImmer } from 'use-immer'
import { fullContainer } from '@/styles'
import { PreviewImageButton } from '@/app/PreviewImageButton'
import { AINames, AIView } from './AIViews'
import styles from './styles.module.css'
import { useEmojiPicker } from './utils/useEmojiPicker'

const App: FC = () => {
  const [aiName, setAIName] = useAIName()
  const [width, compWidthProps] = useAIDialogWidth()
  const [dialog, dispatch] = useAIDialog()
  const [openEmojiPicker] = useEmojiPicker()
  return (
    <div className={classNames(fullContainer, 'bg-[#fff7e6] !overflow-auto')}>
      <div
        className={classNames(
          'min-h-full max-w-[800px] px-4 pb-4 box-border',
          'mx-auto flex flex-col gap-4 bg-[#e6f4ff] items-center',
        )}
      >
        <Typography.Title level={2}>AI对话框截图生成器</Typography.Title>
        <div className='self-start flex flex-col'>
          AI种类:
          <span className='flex gap-2 items-center'>
            <Radio.Group
              value={aiName}
              onChange={(e) => setAIName(e.target.value)}
            >
              {AINames.map((name) => (
                <Radio key={name} value={name}>
                  {name}
                </Radio>
              ))}
            </Radio.Group>
          </span>
        </div>
        <div className='self-start w-full flex flex-col'>
          图片宽度:
          <span className='flex gap-2 items-center'>
            <InputNumber
              {...compWidthProps}
              suffix='px'
              controls={false}
            ></InputNumber>
            <Slider
              {...compWidthProps}
              className='flex-auto max-w-2/3'
            ></Slider>
          </span>
        </div>
        <div
          className={classNames(
            styles.result,
            'overflow-x-auto w-5/6 min-w-[320px] min-h-[150px]',
          )}
        >
          <Suspense
            fallback={<Skeleton className='w-full h-full' active></Skeleton>}
          >
            <div className={classNames('mx-auto')} style={{ width }}>
              <AIView
                dialog={dialog}
                dispatch={dispatch}
                name={aiName}
              ></AIView>
            </div>
          </Suspense>
        </div>
        <span className='flex gap-4'>
          <PreviewImageButton
            dialog={dialog}
            dispatch={dispatch}
            name={aiName}
            width={width}
          />
          <Button onClick={openEmojiPicker}>☝️🤓诶！弄点emoji给你</Button>
        </span>
      </div>
    </div>
  )
}

export default App

const useAIName = () => {
  const [aiName, oriSetAIName] = useState(AINames[0])
  const setAIName = useCallback((newName: string) => {
    if (AINames.indexOf(newName) !== -1) {
      oriSetAIName(newName)
    }
  }, [])
  return [aiName, setAIName] as const
}

const useAIDialogWidth = () => {
  const [width, setWidth] = useState(300)
  const compWidthProps = {
    min: 160,
    max: 640,
    value: width,
    onChange: (val: number | null) => val && setWidth(val),
  }
  return [width, compWidthProps] as const
}

const getDialog = (user?: string, ai?: string) => ({
  user: user || '你好',
  ai: ai || '你好！😊',
  key: Date.now(),
})
const useAIDialog = () => {
  const [dialog, setDialog] = useImmer(() => [getDialog()])
  const dispatch = useMemo(() => {
    return {
      insert(index: number, user?: string, ai?: string) {
        setDialog((draft) => {
          draft.splice(index, 0, getDialog(user, ai))
        })
      },
      delete(index: number) {
        setDialog((draft) => {
          draft.splice(index, 1)
        })
      },
      change(index: number, type: 'user' | 'ai', newVal: string) {
        setDialog((draft) => {
          draft[index][type] = newVal
        })
      },
    }
  }, [setDialog])
  return [dialog, dispatch] as const
}

export type AIDialog = ReturnType<typeof useAIDialog>[0]
export type AIDialogDispatch = ReturnType<typeof useAIDialog>[1]
