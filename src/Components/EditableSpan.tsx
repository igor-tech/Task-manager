import React, {ChangeEvent, useState} from 'react';

export type EditableSpanType = {
    title: string
    onChange: (value: string) => void
}

export const EditableSpan = (props: EditableSpanType) => {
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
    ? <input autoFocus onBlur={deactivateEditMode} value={title} onChange={onChangeTitleHandler}/>
    : <span onDoubleClick={activateEditMode}>{props.title}</span>


}