import { configureStore } from '@reduxjs/toolkit'
import objectAttributesReducer from './objectAttributesSlice'

export const store = configureStore({
  reducer: {
    objectAttributes: objectAttributesReducer
  }
})
