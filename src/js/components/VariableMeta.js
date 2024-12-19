import React from 'react'
import { useDispatch } from 'react-redux'
import { updateVariable } from '../store/objectAttributesSlice'
import CopyToClipboard from './CopyToClipboard'

// icons
import { RemoveCircle as Remove, AddCircle as Add } from './icons'

// theme
import Theme from '../themes/getStyle'

export default function VariableMeta ({
  src,
  theme,
  size,
  enableClipboard,
  onRemove,
  onAdd,
  namespace,
  rjvId
}) {
  const dispatch = useDispatch()

  const handleRemove = () => {
    if (onRemove) {
      const result = onRemove()
      if (result !== false) {
        dispatch(
          updateVariable({
            rjvId,
            data: {
              name: namespace[namespace.length - 1],
              namespace: namespace.slice(0, -1),
              existingValue: src,
              variableRemoved: true
            },
            type: 'variable-removed'
          })
        )
      }
    }
  }

  const handleAdd = () => {
    if (onAdd) {
      const result = onAdd()
      if (result !== false) {
        dispatch(
          updateVariable({
            rjvId,
            data: {
              name: null,
              namespace,
              existingValue: src,
              newValue: src
            },
            type: 'variable-added'
          })
        )
      }
    }
  }

  return (
    <div {...Theme(theme, 'object-meta-data')} className='object-meta-data'>
      {size !== 0
        ? (
          <span {...Theme(theme, 'object-size')} className='object-size'>
            {size} item{size === 1 ? '' : 's'}
          </span>
          )
        : null}
      {enableClipboard
        ? (
          <CopyToClipboard
            clickCallback={enableClipboard}
            {...{ src, theme, namespace }}
          />
          )
        : null}
      {onAdd !== false
        ? (
          <span
            className='click-to-add'
            {...Theme(theme, 'addVarIcon')}
            onClick={handleAdd}
          >
            <Add className='click-to-add-icon' />
          </span>
          )
        : null}
      {onRemove !== false
        ? (
          <span
            className='click-to-remove'
            {...Theme(theme, 'removeVarIcon')}
            onClick={handleRemove}
          >
            <Remove className='click-to-remove-icon' />
          </span>
          )
        : null}
    </div>
  )
}
