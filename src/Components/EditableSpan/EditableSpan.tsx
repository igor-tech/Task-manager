import React, {ChangeEvent, memo, useState} from 'react';
import {TextField} from '@material-ui/core';

export type EditableSpanType = {
    title: string
    onChange: (value: string) => void
}

export const EditableSpan = memo((props: EditableSpanType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.onChange(title)
    }


    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)


    return editMode
    ? <TextField autoFocus onBlur={deactivateEditMode} value={title} onChange={onChangeTitleHandler}/>
    : <span onDoubleClick={activateEditMode}>{props.title}</span>


})