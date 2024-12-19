import { createSlice } from '@reduxjs/toolkit'
import { toType } from '../helpers/util'

const initialState = {
  objects: {}
}

export const objectAttributesSlice = createSlice({
  name: 'objectAttributes',
  initialState,
  reducers: {
    setAttribute: (state, action) => {
      const { rjvId, name, key, value } = action.payload
      if (!state.objects[rjvId]) {
        state.objects[rjvId] = {}
      }
      if (!state.objects[rjvId][name]) {
        state.objects[rjvId][name] = {}
      }
      state.objects[rjvId][name][key] = value
    },
    reset: (state, action) => {
      const { rjvId } = action.payload
      // Reset specific rjvId state
      if (state.objects[rjvId]) {
        state.objects[rjvId] = {}
      }
    },
    updateVariable: (state, action) => {
      const { rjvId, data, type } = action.payload
      const updatedSrc = updateSrc(state, rjvId, data)
      if (!state.objects[rjvId]) {
        state.objects[rjvId] = {}
      }
      if (!state.objects[rjvId].action) {
        state.objects[rjvId].action = {}
      }
      state.objects[rjvId].action['variable-update'] = {
        ...data,
        type,
        updatedSrc
      }
    },
    addKeyRequest: (state, action) => {
      const { rjvId, data } = action.payload
      if (!state.objects[rjvId]) {
        state.objects[rjvId] = {}
      }
      if (!state.objects[rjvId].action) {
        state.objects[rjvId].action = {}
      }
      state.objects[rjvId].action['new-key-request'] = data
    }
  }
})

// Helper function to update source
const updateSrc = (state, rjvId, request) => {
  const { name, namespace, newValue, variableRemoved } = request
  const clonedNamespace = [...namespace]
  clonedNamespace.shift()

  // Get current src
  const src = state.objects[rjvId]?.global?.src
  if (!src) return null

  // Deep copy src
  let updatedSrc = deepCopy(src, [...clonedNamespace])

  // Navigate to target
  let walk = updatedSrc
  for (const idx of clonedNamespace) {
    walk = walk[idx]
  }

  if (variableRemoved) {
    if (toType(walk) === 'array') {
      walk.splice(name, 1)
    } else {
      delete walk[name]
    }
  } else {
    if (name !== null) {
      walk[name] = newValue
    } else {
      updatedSrc = newValue
    }
  }

  return updatedSrc
}

const deepCopy = (src, copyNamespace) => {
  const type = toType(src)
  let result
  const idx = copyNamespace.shift()

  if (type === 'array') {
    result = [...src]
  } else if (type === 'object') {
    result = { ...src }
  }

  if (idx !== undefined) {
    result[idx] = deepCopy(src[idx], copyNamespace)
  }

  return result
}

export const { setAttribute, reset, updateVariable, addKeyRequest } =
  objectAttributesSlice.actions

export default objectAttributesSlice.reducer

// Selectors
export const selectAttribute = (state, rjvId, name, key) => {
  return state.objectAttributes.objects[rjvId]?.[name]?.[key]
}
