import { FC, lazy } from 'react'
import { AIDialog, AIDialogDispatch } from '../page'

export const AINames = ['Chatgpt', 'DeepSeek', 'Kimi']

export type AIComponentProps = {
  dialog: AIDialog
  dispatch: AIDialogDispatch
  hiddenEditIcon?: Boolean
}
export type AIComponent = FC<AIComponentProps>
const AICompMap = new Map(
  AINames.map((name) => [name, lazy<AIComponent>(() => import(`./${name}`))]),
)

type Props = AIComponentProps & {
  name: string
}
export const AIView: FC<Props> = (props) => {
  const { name, dialog, dispatch, hiddenEditIcon } = props
  const Comp = AICompMap.get(name)!
  return (
    <Comp
      dialog={dialog}
      dispatch={dispatch}
      hiddenEditIcon={hiddenEditIcon}
    ></Comp>
  )
}
