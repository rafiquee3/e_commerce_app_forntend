import {LoginForm} from '../components/LoginForm'
import type { ReactElement } from 'react'
import { Layout } from '../components/Layout'
import { FormLayout } from '../components/Layout'
import type { NextPageWithLayout } from './_app'

const Login: NextPageWithLayout = () => {
  return <LoginForm/>
}

Login.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title={'signin'}>
      <FormLayout>{page}</FormLayout>
    </Layout>
  )
}

export default Login;