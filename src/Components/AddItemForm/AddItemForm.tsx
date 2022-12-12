import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';

export type AddItemForm = {
    addItem: (title: string) => void

}
export const AddItemForm = memo((props: AddItemForm) => {
    // console.log('AddItemForm is called')
    let [value, setValue] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        setError(null)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }

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
        <TextField
            value={value}
            onChange={onChangeHandler}
            label={"Type value"}
            onKeyPress={onKeyPressHandler}
            error={!!error}
            helperText={error}
        />

        <IconButton onClick={addTaskHandler}><AddBoxIcon fontSize={'large'} color={'primary'}/></IconButton>

    </div>
})