import styled from 'styled-components'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import allowOnlyLetters from '../../../lib/helpers/allowOnlyLetters'
import UsernameButton from '../atoms/Username.Button'
import Box from '../../global/Box'
import UsernameInput from '../atoms/Username.Input'
import { useAppDispatch, useAppSelector } from '../../../store'
import { useRouter } from 'next/router'
import defaultBox from '../../../assets/styles/default.Box'
import ButtonState from '../../global/ButtonState'
import { Username } from '../../../lib/interfaces'
import { useCreateUserMutation } from '../../../services/api'
import { setUsername } from '../../../store/ducks/users'
import { setError } from '../../../store/ducks/error'

const FormBox = styled(Box)`
  ${defaultBox}
  /* background-color: ${({ theme }) => theme.colors.primaryDark}; */

  @media (max-width: ${({ theme }) => theme.mediaWidthSizes.medium}) {
    min-width: fit-content;
    width: 75vw;
    border-radius: 20px;
    & input {
      width: 100%;
    }
  }

  @media (max-height: ${props => props.theme.mediaWidthSizes.small}) {
    max-width: 280px;
    padding: 20px;

    & input {
      height: 36px;
      max-width: 100%;
    }
    & button {
      height: 32px;
      margin-top: 15px;
      padding: 0;
    }
  }
`

function UsernameForm() {
  const { register, handleSubmit, setValue, resetField, watch } =
    useForm<Username>({ defaultValues: { username: '' } })
  const [createUser, result] = useCreateUserMutation()
  const sanitizedUsername = watch('username', '')
  const dispatch = useAppDispatch()
  const socketID = useAppSelector(state => state.user.socketID)
  const router = useRouter()

  const handleValidation = async (username: string) => {
    resetField('username')
    createUser({ username, socketID, roomCode: '' })
      .unwrap()
      .then(
        async response => {
          dispatch(setUsername(username))
          router.push('/code')
        },
        error => {
          dispatch(setError(error.data.message))
        }
      )
  }

  return (
    <FormBox
      as="form"
      autoComplete="off"
      onSubmit={handleSubmit(data => handleValidation(data.username))}
    >
      <UsernameInput
        {...register('username')}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue('username', allowOnlyLetters(e))
        }
        value={sanitizedUsername}
      />
      <UsernameButton type="submit">
        <ButtonState loading={result.isLoading} text="Join" />
      </UsernameButton>
    </FormBox>
  )
}

export default UsernameForm