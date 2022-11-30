import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from '../Todolist.module.css';

export type AddItemFormPropsType = {
    addItem: (title: string) => void

}
export const AddItemForm = (props: AddItemFormPropsType) => {
    let [value, setValue] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        setError(null)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const addTaskHandler = () => {
        if (value.trim() !== '') {
            props.addItem(value.trim())
            setValue('')
        } else {
            setError('Title is required')
        }
    }

    return <div>
        <input value={value} onChange={onChangeHandler}
               className={error ? styles.error : ''}
               onKeyPress={onKeyPressHandler}
        />
        <button onClick={addTaskHandler}>+</button>
        {error && <div className={styles.errorMessage}>{error}</div>}

    </div>
}