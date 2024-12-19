import React from 'react'
import { useDispatch } from 'react-redux'
import JsonObject from './DataTypes/Object'
import ArrayGroup from './ArrayGroup'
import { setAttribute } from '../store/objectAttributesSlice'

export default function JsonViewer (props) {
  const dispatch = useDispatch()
  let namespace = [props.name]
  let ObjectComponent = JsonObject

  // Initialize the global src in Redux store
  React.useEffect(() => {
    if (props.rjvId && props.src) {
      dispatch(
        setAttribute({
          rjvId: props.rjvId,
          name: 'global',
          key: 'src',
          value: props.src
        })
      )
    }
  }, [props.rjvId, props.src, dispatch])

  if (typeof props.name === 'object' && !Array.isArray(props.name)) {
    // Support Classes and Functional Components
    const ComponentName =
      props.name?.displayName || props.name?.name || props.name?.type?.name
    namespace = [ComponentName || 'Anonymous']
  }

  if (
    Array.isArray(props.src) &&
    props.groupArraysAfterLength &&
    props.src.length > props.groupArraysAfterLength
  ) {
    ObjectComponent = ArrayGroup
  }

  return (
    <div className='pretty-json-container object-container'>
      <div className='object-content'>
        <ObjectComponent namespace={namespace} depth={0} jsvRoot {...props} />
      </div>
    </div>
  )
}
