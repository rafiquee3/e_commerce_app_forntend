import { Layout } from '@/components/Layout'
import { ProductDetailLayout } from '@/components/Layout/ProductDetailLayout.component'
import { AddToCartBox } from '@/components/Product/AddToCartBox.component'
import { ProductType } from '@/components/Product/ProductItem.component'
import { GetStaticProps, GetStaticPaths } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'
import axios from 'axios';

const Product: NextPageWithLayout = ({ product }: { product: ProductType } | any): JSX.Element => {
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
  const products = await axios.get(
		`http://localhost:3000/api/products/getAllProducts`
	);
  const paths = products.data.map((product: ProductType) => ({
    params: { slug: product.slug },
  }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const products = await axios.get(
		`http://localhost:3000/api/products/getAllProducts`
	);
  const product = products.data.filter((product: ProductType) => product.slug === params.slug) || [{}];
  return {
    props: {
      product: product[0],
    },
  }
}

export default Product;