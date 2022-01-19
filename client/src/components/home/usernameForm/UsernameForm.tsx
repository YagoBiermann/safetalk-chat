import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import defaultBox from '../../../assets/styles/default.Box'
import CenterColumn from '../../../assets/styles/default.CenterColumn'
import allowOnlyLetters from '../../../lib/helpers/allowOnlyLetters'
import { Username } from '../../../lib/interfaces'
import { useCreateUserMutation } from '../../../services/api'
import { useAppDispatch, useAppSelector } from '../../../store'
import { setError } from '../../../store/ducks/app'
import { setUsername } from '../../../store/ducks/users'
import ButtonState from '../../global/ButtonState'
import UsernameButton from './Username.Button'
import UsernameInput from './Username.Input'
import { FormBoxMobile } from './Username.MediaQueries'

const FormBox = styled.div`
  ${CenterColumn}
  ${defaultBox}
  ${FormBoxMobile}
`

function UsernameForm() {
  const { register, handleSubmit, setValue, resetField, watch } =
    useForm<Username>({ defaultValues: { username: '' } })
  const [createUser, result] = useCreateUserMutation()
  const sanitizedUsername = watch('username', '')
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleValidation = async (username: string) => {
    resetField('username')
    createUser({ username, roomCode: '' })
      .unwrap()
      .then(
        async response => {
          router.replace('/code')
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
