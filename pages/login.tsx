import {LoginForm} from '../components/LoginForm'
import { ReactElement, useEffect } from 'react'
import { Layout } from '../components/Layout'
import { FormLayout } from '../components/Layout'
import type { NextPageWithLayout } from './_app'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const Login: NextPageWithLayout = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;
  const url: any = redirect;

  useEffect(() => {
    if (session?.user) {
      router.push(url || `/?redirect=${redirect}`);
    }
  }, [router, session, redirect, url]);
  return (
    <LoginForm/>
  )
}

Login.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title={'signin'}>
      <FormLayout>{page}</FormLayout>
    </Layout>
  )
}

export default Login;