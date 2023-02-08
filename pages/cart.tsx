import styled from "styled-components";
import { ReactElement, useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import type { NextPageWithLayout } from './_app'
import { useRouter } from 'next/router'
import { CartProductType, useCartStore, useNavStore, useUserStore } from '@/components/Store/store'
import { CartLayout } from "@/components/Layout/CartLayout.component";
import Image from "next/image";
import { ProductsList } from "@/components/Product/ProductsList.component";

const Container = styled.div`
    display: flex;
    justify-content: space-between;

    .subtotal {
        background: gray;
    }
`
const Table = styled.table`
    width: 70%;
    border: none;
    th {
        text-align: right;
    }
    td {
        text-align: right;
    }
    tr {
        border-bottom: 1px solid black;
    }
    .item {
        text-align: left;
    }
`
const Cart: NextPageWithLayout = (): JSX.Element => {
  const router = useRouter();
  const { redirect } = router.query;
  const url: any = redirect;
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const { cartItems } = useCartStore();
  
  useEffect(() => {
    setQuantity(cartItems.reduce((acc, curr) => acc + curr.quantity, 0));
    setTotal(cartItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0));
  }, [cartItems])
  const handlePayment = () => {
    console.log('url: ', url)
    router.push(url || `/shipping`);
  }
  return (
    <Container>
        {quantity ? 
        <>
            <ProductsList />
            <div className="subtotal">
                <p>Zamówienie({quantity}): {total} PLN</p>
                <button type="button" onClick={handlePayment}>Zapłać</button>
            </div>
        </>
        :
        <div>Twój koszyk jest pusty</div>
        }
    </Container>
  )
}

Cart.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title="Cart">
        <CartLayout>
            {page}
        </CartLayout>
    </Layout>
  )
}
export default Cart;