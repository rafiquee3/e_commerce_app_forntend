import { MainLayout } from '../components/Layout'
import { ReactElement, useEffect } from 'react'
import { Layout } from '../components/Layout'
import type { NextPageWithLayout } from './_app'
import { useNavStore } from '@/components/Store/store'
import { ProductItem, ProductType } from '@/components/Product/ProductItem.component'
import useSWR from "swr";
import axios from 'axios';

const Index: NextPageWithLayout = (): JSX.Element => {
  const setPage = useNavStore((state) => state.setPage);
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(
    "http://localhost:3000/api/products/getAllProducts",
    fetcher
  );
  useEffect(() => {
    setPage('home');
  }, [setPage])
  if (error) return <div>Wystąpił błąd podczas ładowania</div>;
  if (!data) return <div>Ładownaie...</div>
  return (
    <>
     {data.map((product: ProductType) => <ProductItem key={product.name} {...product}/>)}
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
