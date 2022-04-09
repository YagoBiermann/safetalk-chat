import type { GetServerSideProps, NextPage } from 'next'
import nookies from 'nookies'
import { fetchCurrentUser, generateCode } from '../../lib/services/api'
import { UserDTO } from '../../lib/interfaces'
import Code from '../../components/code/main/Code'

export const getServerSideProps: GetServerSideProps = async ctx => {
  const cookies = nookies.get(ctx)
  const user = await fetchCurrentUser(cookies)
  const roomCode = await generateCode(cookies)
  if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      user,
      roomCode
    }
  }
}

type CodePageProps = NextPage & {
  user: UserDTO
  roomCode: string
}

const CodePage = (props: CodePageProps) => {
  return (
    <>
      <Code roomCode={props.roomCode} user={props.user} />
    </>
  )
}

export default CodePage
