import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios, { AxiosResponse } from 'axios'
import store from '../../../store'
import {
  setUploadingFileAsFalse,
  setError,
  setUploadingFileAsTrue
} from '../../../store/ducks/app'
import { ENDPOINTS, MESSAGE_TYPE } from '../../enums'
import {
  ApiResponse,
  CookieProps,
  OnlineUsersDTO,
  RoomCode,
  UploadFileResponse,
  UserDTO,
  Username
} from '../../interfaces'
import { sendMessage } from '../messages'

export const roomApi = createApi({
  reducerPath: 'roomApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINTS.BACKEND_URL,
    credentials: 'include',
    prepareHeaders: (headers: Headers) => {
      headers.set('Content-Type', 'application/json')
      headers.set('Accept', 'application/json')
      return headers
    }
  }),
  endpoints: builder => ({
    createUser: builder.mutation<ApiResponse, Username>({
      query: user => ({
        method: 'POST',
        url: `users/create`,
        body: user
      })
    }),
    fetchUsers: builder.query<OnlineUsersDTO, undefined>({
      query: () => ({
        url: `rooms/current/users`,
        method: 'GET'
      })
    }),
    fetchCurrentUser: builder.query<UserDTO, undefined>({
      query: () => ({
        url: 'users/create',
        method: 'GET'
      })
    }),
    createRoom: builder.mutation<ApiResponse, RoomCode>({
      query: room => ({
        method: 'POST',
        url: 'rooms/create',
        body: room
      })
    }),
    joinRoom: builder.mutation<ApiResponse, RoomCode>({
      query: room => ({
        method: 'POST',
        url: 'rooms/join',
        body: room
      })
    })
  })
})

const api = axios.create({
  baseURL: ENDPOINTS.NGINX_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

type sendFileMessageType = {
  file: File
  message: string
  messageType: MESSAGE_TYPE
}

const sendFileMessage = async (message: sendFileMessageType) => {
  try {
    const formData = new FormData()
    formData.append('file', message.file)
    store.dispatch(setUploadingFileAsTrue())
    const result: AxiosResponse<UploadFileResponse, { file: string }> =
      await axios.post(`${ENDPOINTS.BACKEND_URL}rooms/file`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      })
    sendMessage({
      file: result.data.file,
      message: message.message,
      messageType: message.messageType
    })
  } catch (error: any) {
    store.dispatch(setError(error.message as string))
  } finally {
    store.dispatch(setUploadingFileAsFalse())
  }
}

const fetchUsersInRoom = async (cookies: CookieProps) => {
  try {
    const result: AxiosResponse<OnlineUsersDTO> = await api.get(
      `rooms/current/users`,
      {
        headers: {
          Cookie: `connect.sid=${cookies['connect.sid']}; HttpOnly; Path=/`
        }
      }
    )
    return result.data
  } catch (error) {
    console.log(error)
  }
}

const fetchCurrentUser = async (cookies: CookieProps) => {
  try {
    const result = await api.get<UserDTO>('users/me', {
      headers: {
        Cookie: `connect.sid=${cookies['connect.sid']}; HttpOnly; Path=/`
      }
    })
    return result.data
  } catch (error) {
    console.log(error)
  }
}

const generateCode = async (cookies: CookieProps) => {
  try {
    const result: AxiosResponse<{ roomCode: string }, any> = await api.get(
      'rooms/code',
      {
        headers: {
          Cookie: `connect.sid=${cookies['connect.sid']}; HttpOnly; Path=/`
        }
      }
    )
    return result.data.roomCode
  } catch (error) {
    console.log(error)
  }
}

export { fetchCurrentUser, fetchUsersInRoom, generateCode, sendFileMessage }
export const {
  useCreateUserMutation,
  useCreateRoomMutation,
  useFetchCurrentUserQuery,
  useLazyFetchUsersQuery,
  useJoinRoomMutation
} = roomApi
