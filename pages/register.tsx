import { RegisterForm } from '@/components/RegisterForm'
import type { ReactElement } from 'react'
import { Layout } from '../components/Layout'
import { FormLayout } from '../components/Layout'
import type { NextPageWithLayout } from './_app'

const Register: NextPageWithLayout = () => {
  return (
    <RegisterForm />
  )
}

Register.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title={'signin'}>
      <FormLayout>{page}</FormLayout>
    </Layout>
  )
}

export default Register;