import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AppState {
  error: string | null
}

const initialState: AppState = {
  error: null
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
