import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateVariable } from '../store/objectAttributesSlice'

export default function VariableEditor ({
  variable,
  namespace,
  rjvId,
  onEdit,
  onDelete
}) {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState('')

  const handleEditClick = () => {
    setIsEditing(true)
    setEditValue(variable.value)
  }

  const handleSaveEdit = () => {
    if (onEdit) {
      const result = onEdit({
        existingValue: variable.value,
        newValue: editValue,
        updatedSrc: null,
        name: variable.name,
        namespace
      })

      if (result !== false) {
        dispatch(
          updateVariable({
            rjvId,
            data: {
              name: variable.name,
              namespace,
              existingValue: variable.value,
              newValue: editValue
            },
            type: 'variable-edited'
          })
        )
      }
    }
    setIsEditing(false)
  }

  const handleDeleteClick = () => {
    if (onDelete) {
      const result = onDelete({
        name: variable.name,
        namespace,
        existingValue: variable.value
      })

      if (result !== false) {
        dispatch(
          updateVariable({
            rjvId,
            data: {
              name: variable.name,
              namespace,
              existingValue: variable.value,
              variableRemoved: true
            },
            type: 'variable-removed'
          })
        )
      }
    }
  }

  return (
    <div className='variable-editor'>
      {isEditing
        ? (
          <div>
            <input
              type='text'
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
            />
            <button onClick={handleSaveEdit}>Save</button>
          </div>
          )
        : (
          <div>
            <span>{variable.value}</span>
            <button onClick={handleEditClick}>Edit</button>
            <button onClick={handleDeleteClick}>Delete</button>
          </div>
          )}
    </div>
  )
}
