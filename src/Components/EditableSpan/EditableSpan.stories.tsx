import { EditableSpan } from './EditableSpan'
import { action } from '@storybook/addon-actions'

export default {
  title: 'EditableSpan Component',
  component: EditableSpan,
}

const changeCallback = action('Value changed')

export const EditableSpanBaseExample = () => {
  return <EditableSpan title={'start value'} onChange={changeCallback} />
}
