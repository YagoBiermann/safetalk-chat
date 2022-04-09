import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AppState {
  error: string | null
  isUploadingFile: boolean
}

const initialState: AppState = {
  error: null,
  isUploadingFile: false
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
    setUploadingFileAsTrue: state => {
      state.isUploadingFile = true
    },
    setUploadingFileAsFalse: state => {
      state.isUploadingFile = false
    }
  }
})

export const {
  setError,
  resetError,
  setUploadingFileAsTrue,
  setUploadingFileAsFalse
} = appSlice.actions
export { appSlice }
