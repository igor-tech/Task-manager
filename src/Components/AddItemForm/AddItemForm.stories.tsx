import {AddItemForm} from './AddItemForm';
import {action} from '@storybook/addon-actions';


export default {
    title: 'AddItemForm Component',
    component: AddItemForm
}

const callBack = action('Buttin add was pressed inside the form')
export const AddItemFormBaseExample = (props: any) => {
    return <AddItemForm addItem={callBack}/>
}