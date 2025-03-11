import { FC, lazy } from 'react'
import { AIDialog, AIDialogDispatch } from '../page'

export const AINames = ['Chatgpt', 'DeepSeek', 'Kimi']

export type AIDialogComp = FC<{
  dialog: AIDialog
  dispatch: AIDialogDispatch
}>
const AICompMap = new Map(
  AINames.map((name) => [name, lazy<AIDialogComp>(() => import(`./${name}`))]),
)

type Props = {
  name: string
  watermark?: boolean
  dialog: AIDialog
  dispatch: AIDialogDispatch
}
export const AIComp: FC<Props> = (props) => {
  const { name, dialog, dispatch } = props
  const Comp = AICompMap.get(name)!
  return <Comp dialog={dialog} dispatch={dispatch}></Comp>
}
