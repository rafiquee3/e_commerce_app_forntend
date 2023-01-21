import { MainLayout } from '../components/Layout'
import { ReactElement, useEffect } from 'react'
import { Layout } from '../components/Layout'
import type { NextPageWithLayout } from './_app'
import { useRouter } from 'next/router'
import { useNavStore, useUserStore } from '@/components/Store/store'
import { data } from '@/utils/data'
import { ProductItem } from '@/components/Product/ProductItem.component'

const Index: NextPageWithLayout = (): JSX.Element => {
  const user = useUserStore((state) => state.user);
  const setPage = useNavStore((state) => state.setPage);
  const router = useRouter();
  useEffect(() => {
    setPage('home');
  }, [setPage])

  return (
    <>
     {data.products.map(product => <ProductItem key={product.name} {...product}/>)}
    </>
  )
}

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title="Home page">
      <MainLayout>{page}</MainLayout>
    </Layout>
  )
}

export default Index;
