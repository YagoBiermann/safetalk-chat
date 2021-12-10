import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SuccessMessage, User } from '../../lib/interfaces'
import { ROUTES, ENDPOINTS } from '../../lib/enums'

export const roomApi = createApi({
  reducerPath: 'roomApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ENDPOINTS.BACKEND_URL,
    prepareHeaders: (headers: Headers) => {
      headers.set('Content-Type', 'application/json')
      headers.set('Accept', 'application/json')
      return headers
    }
  }),
  endpoints: builder => ({
    createUser: builder.mutation({
      query: (user: User) => ({
        method: 'POST',
        url: `${ROUTES.CREATE_USER}`,
        body: user
      })
    }),
    fetchRooms: builder.query<Array<string>, void>({
      query: () => ROUTES.GET_ROOMS
    }),
    createRoom: builder.mutation<SuccessMessage, User>({
      query: (user: User) => ({
        method: 'POST',
        url: ROUTES.CREATE_ROOM,
        body: user
      })
    }),
    joinRoom: builder.mutation<SuccessMessage, User>({
      query: (user: User) => ({
        method: 'POST',
        url: ROUTES.JOIN_ROOM,
        body: user
      })
    })
  })
})
export const {
  useCreateUserMutation,
  useCreateRoomMutation,
  useFetchRoomsQuery,
  useJoinRoomMutation
} = roomApi
