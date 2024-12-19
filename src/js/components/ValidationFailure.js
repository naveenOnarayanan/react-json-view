import React from 'react'
import { useDispatch } from 'react-redux'
import { reset } from '../store/objectAttributesSlice'
import { Add as Clear } from './icons'

// global theme
import Theme from './../themes/getStyle'

// this input appears when adding a new value to an object
export default function ValidationFailure ({ message, active, theme, rjvId }) {
  const dispatch = useDispatch()

  if (!active) return null

  return (
    <div
      className='validation-failure'
      {...Theme(theme, 'validation-failure')}
      onClick={() => {
        dispatch(reset({ rjvId }))
      }}
    >
      <span {...Theme(theme, 'validation-failure-label')}>{message}</span>
      <Clear {...Theme(theme, 'validation-failure-clear')} />
    </div>
  )
}
