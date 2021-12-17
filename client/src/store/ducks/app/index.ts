import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DropFile } from '../../../lib/interfaces'

interface AppState {
  error: string | null
  file: Array<DropFile>
}

const initialState: AppState = {
  error: null,
  file: []
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
    }
  }
})

export const { setError, resetError } = appSlice.actions
export { appSlice }
