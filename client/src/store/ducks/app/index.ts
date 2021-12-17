import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DropFile } from '../../../lib/interfaces'

interface AppState {
  error: string | null
  files: Array<DropFile>
}

const initialState: AppState = {
  error: null,
  files: []
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    resetError: state => {
      state.error = null
    },
    addFiles: (state, action: PayloadAction<DropFile>) => {
      state.files.push(action.payload)
    },
    clearFiles: state => {
      state.files = []
    }
  }
})

export const { setError, resetError, addFiles, clearFiles } = appSlice.actions
export { appSlice }
