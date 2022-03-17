import { UserDTO, Username } from '../../interfaces/index'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios, { AxiosResponse } from 'axios'
import { ENDPOINTS } from '../../enums'
import {
  ApiResponse,
  CookieProps,
  OnlineUsersDTO,
  FileName,
  RoomCode
} from '../../interfaces'

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
    }),
    uploadFile: builder.mutation<FileName, { file: File; roomCode: RoomCode }>({
      query: ({ file, roomCode }) => ({
        method: 'POST',
        url: `rooms/${roomCode}/files`,
        headers: { 'Content-Type': 'multipart/form-data' },
        body: { file }
      })
    }),
    fetchFile: builder.query<
      File,
      { fileName: FileName; mimeType: string; roomCode: RoomCode }
    >({
      query: ({ fileName, mimeType, roomCode }) => ({
        method: 'GET',
        url: `rooms/${roomCode}/files/${fileName}`,
        headers: { 'Content-Type': mimeType }
      })
    }),
    streamMedia: builder.query<
      MediaStream,
      { media: string; range: string; mimeType: string; roomCode: RoomCode }
    >({
      query: ({ media, range, roomCode, mimeType }) => ({
        method: 'GET',
        url: `rooms/${roomCode}/files/stream/${media}`,
        headers: { Range: range, 'Content-Type': mimeType }
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

const fetchUsersInRoom = async (cookies: CookieProps) => {
  try {
    const result: AxiosResponse<OnlineUsersDTO> = await api.get(
      `rooms/current/users`,
      {
        headers: {
          Cookie: `token=${cookies.token}; connect.sid=${cookies['connect.sid']}; HttpOnly; Path=/`
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
        Cookie: `token=${cookies.token}; connect.sid=${cookies['connect.sid']}; HttpOnly; Path=/`
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
          Cookie: `token=${cookies.token}; connect.sid=${cookies['connect.sid']}; HttpOnly; Path=/`
        }
      }
    )

    return result.data.roomCode
  } catch (error) {
    console.log(error)
  }
}

export { fetchCurrentUser, fetchUsersInRoom, generateCode }
export const {
  useCreateUserMutation,
  useCreateRoomMutation,
  useFetchCurrentUserQuery,
  useLazyFetchUsersQuery,
  useJoinRoomMutation
} = roomApi
