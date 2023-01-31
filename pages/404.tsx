import { NotFoundLayout } from '@/components/Layout/NotFound.Layout'
import { ReactElement } from 'react'
import { Layout } from '../components/Layout'
import type { NextPageWithLayout } from './_app'

const Index: NextPageWithLayout = (): JSX.Element => {
  return (
    <>
        <div>Podana strona nie istnieje</div>
    </>
  )
}

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title="Strona nie istnieje">
        <NotFoundLayout>{page}</NotFoundLayout>
    </Layout>
  )
}

export default Index;