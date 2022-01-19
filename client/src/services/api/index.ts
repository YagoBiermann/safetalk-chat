import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios, { AxiosResponse } from 'axios'
import { ENDPOINTS, ROUTES } from '../../lib/enums'
import {
  ApiResponse,
  CookieProps,
  OnlineUsersDTO,
  FileName,
  RoomCode,
  UserRedux
} from '../../lib/interfaces'

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
    createUser: builder.mutation<ApiResponse, UserRedux>({
      query: user => ({
        method: 'POST',
        url: `${ROUTES.CREATE_USER}`,
        body: user
      })
    }),
    fetchUsers: builder.query<OnlineUsersDTO, string>({
      query: (roomCode: string) => ({
        url: `rooms/${roomCode}/users`,
        method: 'GET'
      })
    }),
    createRoom: builder.mutation<ApiResponse, UserRedux>({
      query: user => ({
        method: 'POST',
        url: ROUTES.CREATE_ROOM,
        body: user
      })
    }),
    joinRoom: builder.mutation<ApiResponse, UserRedux>({
      query: user => ({
        method: 'POST',
        url: ROUTES.JOIN_ROOM,
        body: user
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

const fetchUsersOnRoom = async (
  cookies: CookieProps,
  roomCode: string = ''
) => {
  try {
    const result: AxiosResponse<OnlineUsersDTO> = await api.get(
      `rooms/${roomCode}/users`,
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
    const result = await api.get(ROUTES.GET_CURRENT_USER, {
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
    const result: AxiosResponse<{ code: string }, any> = await api.get(
      ROUTES.GENERATE_CODE,
      {
        headers: {
          Cookie: `token=${cookies.token}; connect.sid=${cookies['connect.sid']}; HttpOnly; Path=/`
        }
      }
    )

    return result.data.code
  } catch (error) {
    console.log(error)
  }
}

export { fetchCurrentUser, fetchUsersOnRoom, generateCode }
export const {
  useCreateUserMutation,
  useCreateRoomMutation,
  useLazyFetchUsersQuery,
  useJoinRoomMutation
} = roomApi
