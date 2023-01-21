import { Layout } from '@/components/Layout'
import { ProductDetailLayout } from '@/components/Layout/ProductDetailLayout.component'
import { AddToCartBox } from '@/components/Product/AddToCartBox.component'
import { ProductType } from '@/components/Product/ProductItem.component'
import { useCartStore } from '@/components/Store/store'
import { data } from '@/utils/data'
import { GetStaticProps, GetStaticPaths } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'

const Product: NextPageWithLayout = ({ product }: { product: ProductType } | any): JSX.Element => {
  console.log(product)
  const { cartItems } = useCartStore();
  console.log(cartItems);
  return (
    <>
      <Link href={'/'}>Powrót</Link>
      <Image 
      src={`${product.image}`} 
      alt={`image ${product.name}`}
      width={250}
      height={250}
      >
      </Image>
      <div>{product.name}</div>
      <div>{product.category}</div>
      <div>{product.brand}</div>
      <div>{product.numReviews}</div>
      <div>{product.description}</div>
      <AddToCartBox product={product} />
    </>
  )
}

Product.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title={''}>
      <ProductDetailLayout>{page}</ProductDetailLayout>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  //const res = await fetch('http://localhost:3001/product/all')
  //const products = await res.json()
  const paths = data.products.map((product: ProductType) => ({
    params: { slug: product.slug },
  }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  //const res = await fetch(`http://localhost:3001/product/${params.id}`)
  const product = data.products.filter(product => product.slug === params.slug);

  return {
    props: {
      product: product[0],
    },
  }
}

export default Product;