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
import { ProductType } from "@/components/Product/ProductItem.component";

const Container = styled.div`
  .shipping {
    border: 1px solid black;
  }
`
const Placeorder: NextPageWithLayout = (): JSX.Element => {
  type ArrayOfProducts = ProductType[];
  const { data: session } = useSession();
  const { cartItems, shippingAddress, paymentMethod } = useCartStore();
  const [ quantityOfProducts, setQuantityOfProducts] = useState<number>();
  const [ items, setItems] = useState<ArrayOfProducts>();
  const [ address, setAddress ] = useState<any>();
  const [ payment, setPayment ] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    setQuantityOfProducts(cartItems.length);
    setItems(cartItems);
    setAddress(shippingAddress);
    setPayment(paymentMethod);
    if (mounted && !paymentMethod) {
        router.push('/payment');
    }
    return () => { mounted = false }
  }, [cartItems, cartItems.length, paymentMethod, router, shippingAddress]);
  console.log(shippingAddress)
  return (
    <>
        <CheckoutWizard activeStep={3}/>
        <Container>
        <h1>Finalizacja zamówienia</h1>
        {quantityOfProducts === 0 ? (
            <div>
                Koszyk jest pusty, <Link style={{color: 'blue'}} href="/">przejdź do sklepu</Link>
            </div>
        ) : (
          <>
            <div className="shipping">
                <h2>Adres dostawy</h2>
                <p>{address?.location?.name} {address?.location?.surname}, {address?.location?.address}, {address?.location?.postal}, {address?.location?.city}</p>
                <Link href={"/shipping"}>Edytuj</Link>
            </div>
            <div className="shipping">
                <h2>Metoda płatności</h2>
                <p>{payment}</p>
                <Link href={"/payment"}>Edytuj</Link>
            </div>
          </>
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