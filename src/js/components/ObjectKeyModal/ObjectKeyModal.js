import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { reset } from '../../store/objectAttributesSlice'
import { CheckCircle, Add as Cancel } from './../icons'

// global theme
import Theme from './../../themes/getStyle'

// this input appears when adding a new value to an object
export default function ObjectKeyModal ({ theme, rjvId, isValid, submit }) {
  const dispatch = useDispatch()
  const [input, setInput] = useState('')

  const closeModal = () => {
    dispatch(reset({ rjvId }))
  }

  const handleSubmit = () => {
    submit(input)
  }

  return (
    <div
      className='key-modal-request'
      {...Theme(theme, 'key-modal-request')}
      onClick={closeModal}
    >
      <div
        className='key-modal'
        {...Theme(theme, 'key-modal')}
        onClick={e => {
          e.stopPropagation()
        }}
      >
        <div {...Theme(theme, 'key-modal-label')}>Key Name:</div>
        <div style={{ position: 'relative' }}>
          <input
            {...Theme(theme, 'key-modal-input')}
            className='key-modal-input'
            ref={el => el && el.focus()}
            spellCheck={false}
            value={input}
            placeholder='..."'
            onChange={e => {
              setInput(e.target.value)
            }}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                handleSubmit()
              }
            }}
          />
          {isValid(input)
            ? (
              <CheckCircle
                {...Theme(theme, 'key-modal-submit')}
                className='key-modal-submit'
                onClick={handleSubmit}
              />
              )
            : null}
        </div>
        <span {...Theme(theme, 'key-modal-cancel')}>
          <Cancel onClick={closeModal} />
        </span>
      </div>
    </div>
  )
}
