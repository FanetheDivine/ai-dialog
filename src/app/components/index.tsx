import { FC, lazy, Suspense } from 'react'
import { Skeleton, Watermark } from 'antd'

export const AINames = ['Chatgpt', 'DeepSeek', 'Kimi']

const AICompList = AINames.map((name) => lazy(() => import(`./${name}`)))
type AICompProps = {
  index: number
  watermark?: boolean
}
export const AIComp: FC<AICompProps> = (props) => {
  const { index } = props
  const Comp = AICompList[index]
  return (
    <Suspense
      fallback={
        <Skeleton className='w-full h-full max-h-full' active></Skeleton>
      }
    >
      {props.watermark ? (
        <Watermark rotate={0} gap={[-50, 30]} content={'非真实截图仅供娱乐'}>
          <Comp></Comp>
        </Watermark>
      ) : (
        <Comp></Comp>
      )}
    </Suspense>
  )
}
