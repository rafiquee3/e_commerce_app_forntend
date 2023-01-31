import styled from "styled-components";
import { CheckoutWizard } from '@/components/Checkout/CheckoutWizard'
import { ShippingLayout } from '@/components/Layout/ShippingLayout.component'
import { ReactElement, useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import type { NextPageWithLayout } from './_app'
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCartStore } from "@/components/Store/store";
import Link from "next/link";

const Container = styled.div`

`
const Placeorder: NextPageWithLayout = (): JSX.Element => {
  const { data: session } = useSession();
  const { cartItems, shippingAddress, paymentMethod } = useCartStore();
  const [ quantityOfProducts, setQuantityOfProducts] = useState<number>();
  const router = useRouter();
  useEffect(() => {
    setQuantityOfProducts(cartItems.length);
    if (!session?.user) {
      router.push(`/login?redirect=/placeorder`);
    }
    if (!shippingAddress) {
        router.push('/shipping');
    }
    if (!paymentMethod) {
        router.push('/payment');
    }
  }, [cartItems.length, paymentMethod, router, session, shippingAddress, shippingAddress.location]);
  return (
    <>
        <CheckoutWizard activeStep={3}/>
        <Container>
        <h1>Finalizacja zamówienia</h1>
        {quantityOfProducts === 0 ? (
            <div>
                Koszyk jest pusty. <Link href="/">do sklepu</Link>
            </div>
        ) : (
            <div>
                produkty
            </div>
        )}
        </Container>
    </>
  )
}

Placeorder.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title={'shiping'}>
      <ShippingLayout>{page}</ShippingLayout>
    </Layout>
  )
}

export default Placeorder;