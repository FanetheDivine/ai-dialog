import { FC, lazy } from 'react'
import { AIDialog, AIDialogDispatch } from '../page'

export const AINames = ['Chatgpt', 'DeepSeek', 'Kimi']

export type AIComponent = FC<{
  dialog: AIDialog
  dispatch: AIDialogDispatch
}>
const AICompMap = new Map(
  AINames.map((name) => [name, lazy<AIComponent>(() => import(`./${name}`))]),
)

type Props = {
  name: string
  watermark?: boolean
  dialog: AIDialog
  dispatch: AIDialogDispatch
}
export const AIView: FC<Props> = (props) => {
  const { name, dialog, dispatch } = props
  const Comp = AICompMap.get(name)!
  return <Comp dialog={dialog} dispatch={dispatch}></Comp>
}
