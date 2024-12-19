import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addKeyRequest,
  selectAttribute
} from '../../store/objectAttributesSlice'
import ObjectKeyModal from './ObjectKeyModal'

// this input appears when adding a new value to an object
export default function AddKeyRequest ({ active, theme, rjvId, defaultValue }) {
  const dispatch = useDispatch()
  const request = useSelector(state =>
    selectAttribute(state, rjvId, 'action', 'new-key-request')
  )

  if (!active) return null

  return (
    <ObjectKeyModal
      rjvId={rjvId}
      theme={theme}
      isValid={input => {
        return (
          input !== '' &&
          Object.keys(request?.existingValue || {}).indexOf(input) === -1
        )
      }}
      submit={input => {
        if (request) {
          const newRequest = {
            newValue: { ...request.existingValue },
            existingValue: request.existingValue,
            namespace: request.namespace,
            name: input
          }
          newRequest.newValue[input] = defaultValue
          dispatch(addKeyRequest({ rjvId, data: newRequest }))
        }
      }}
    />
  )
}
