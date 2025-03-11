import { FC, lazy } from 'react'
import { Watermark } from 'antd'

export const AINames = ['Chatgpt', 'DeepSeek', 'Kimi']

const AICompList = AINames.map((name) => lazy(() => import(`./${name}`)))
type AICompProps = {
  index: number
  watermark?: boolean
}
export const AIComp: FC<AICompProps> = (props) => {
  const { index } = props
  const Comp = AICompList[index]
  return props.watermark ? (
    <Watermark rotate={0} gap={[-50, 30]} content={'非真实截图仅供娱乐'}>
      <Comp></Comp>
    </Watermark>
  ) : (
    <Comp></Comp>
  )
}
