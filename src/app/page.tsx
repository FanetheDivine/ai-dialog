'use client'

import { FC, useState } from 'react'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Button, InputNumber, Radio, Slider, Typography } from 'antd'
import classNames from 'classnames'
import { fullContainer } from '@/styles'
import { AINames, AIComp } from './components'
import styles from './styles.module.css'

const App: FC = () => {
  const [value, setValue] = useState(0)

  const [width, setWidth] = useState(320)
  const widthCompProps = {
    min: 240,
    max: 1800,
    value: width,
    onChange: (val: number | null) => val && setWidth(val),
  }
  return (
    <div className={classNames(fullContainer, 'bg-[#fff7e6] !overflow-auto')}>
      <div
        className={classNames(
          'min-h-full max-w-[800px] mx-auto flex flex-col gap-4 bg-[#e6f4ff] px-4 pb-4 items-center',
        )}
      >
        <Typography.Title level={2}>AI对话框截图生成器</Typography.Title>
        <div className='self-start flex items-center gap-2'>
          AI种类:
          <Radio.Group value={value} onChange={(e) => setValue(e.target.value)}>
            {AINames.map((name, index) => (
              <Radio key={name} value={index}>
                {name}
              </Radio>
            ))}
          </Radio.Group>
        </div>

        <div className='self-start w-full flex items-center gap-2'>
          图片宽度:
          <InputNumber
            {...widthCompProps}
            suffix='px'
            controls={false}
          ></InputNumber>
          <Slider {...widthCompProps} className=' w-2/3'></Slider>
        </div>
        <div
          className={classNames(
            styles.result,
            'overflow-x-auto w-2/3 min-h-[150px]',
          )}
        >
          <div className={classNames('mx-auto')} style={{ width }}>
            <AIComp index={value} watermark></AIComp>
          </div>
        </div>
        <Button type='primary' icon={<PlusCircleOutlined />}>
          加一段对话！
        </Button>
      </div>
    </div>
  )
}

export default App
