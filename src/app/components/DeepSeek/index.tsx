import type { AIDialog, UserDialog } from '../withDialogWrapper'
import { withDialogWrapper } from '../withDialogWrapper'

const UserDialog: UserDialog = (props) => {
  return '在做了'
}

const AIDialog: AIDialog = UserDialog

const DeepSeek = withDialogWrapper(UserDialog, AIDialog)

export default DeepSeek
