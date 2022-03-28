import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AppState {
  error: string | null
  loading: boolean
}

const initialState: AppState = {
  error: null,
  loading: false
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
    setLoading: state => {
      state.loading = true
    },
    resetLoading: state => {
      state.loading = false
    }
  }
})

export const { setError, resetError, setLoading, resetLoading } =
  appSlice.actions
export { appSlice }
