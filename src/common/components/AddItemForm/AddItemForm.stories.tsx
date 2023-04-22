import { AddItemForm } from 'common/components/AddItemForm/AddItemForm'
import { action } from '@storybook/addon-actions'

export default {
  title: 'AddItemForm Component',
  component: AddItemForm,
}

const callBack = async () => {
  action('Buttin add was pressed inside the form')
}
export const AddItemFormBaseExample = () => {
  return <AddItemForm addItem={callBack} />
}
export const AddItemFormDisabledExample = () => {
  return <AddItemForm disabled={true} addItem={callBack} />
}
