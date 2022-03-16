import { UserDTO, Username } from '../../interfaces/index'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios, { AxiosResponse } from 'axios'
import { ENDPOINTS, ROUTES } from '../../enums'
import {
  ApiResponse,
  CookieProps,
  OnlineUsersDTO,
  FileName,
  RoomCode,
  UserRedux
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
    fetchCurrentUser: builder.query<UserDTO, undefined>({
      query: () => ({
        url: ROUTES.GET_CURRENT_USER,
        method: 'GET'
      })
    }),
    createRoom: builder.mutation<ApiResponse, RoomCode>({
      query: room => ({
        method: 'POST',
        url: ROUTES.CREATE_ROOM,
        body: room
      })
    }),
    joinRoom: builder.mutation<ApiResponse, RoomCode>({
      query: room => ({
        method: 'POST',
        url: ROUTES.JOIN_ROOM,
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

const fetchUsersInRoom = async (
  cookies: CookieProps,
  roomCode: string = ''
) => {
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
    const result: AxiosResponse<{ roomCode: string }, any> = await api.get(
      ROUTES.GENERATE_CODE,
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

export { fetchCurrentUser, fetchUsersInRoom as fetchUsersOnRoom, generateCode }
export const {
  useCreateUserMutation,
  useCreateRoomMutation,
  useFetchCurrentUserQuery,
  useLazyFetchUsersQuery,
  useJoinRoomMutation
} = roomApi
