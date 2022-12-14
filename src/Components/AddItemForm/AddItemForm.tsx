import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {IconButton, TextField} from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';

export type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean

}
export const AddItemForm = memo(({addItem, disabled}: AddItemFormPropsType) => {
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
            addItem(value.trim())
            setValue('')
        } else {
            setError('Title is required')
        }
    }

    return <div>
        <TextField
            variant={'outlined'}
            value={value}
            onChange={onChangeHandler}
            label={"Type value"}
            onKeyPress={onKeyPressHandler}
            error={!!error}
            helperText={error}
            disabled={disabled}
        />

        <IconButton onClick={addTaskHandler} disabled={disabled} color={'primary'} >
            <AddBoxIcon fontSize={'large'} />
        </IconButton>

    </div>
})