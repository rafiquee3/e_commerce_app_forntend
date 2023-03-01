import styled from "styled-components";
import { ReactElement, useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import type { NextPageWithLayout } from './_app'
import { useRouter } from 'next/router'
import { useCartStore } from '@/components/Store/store'
import { CartLayout } from "@/components/Layout/CartLayout.component";
import axios from 'axios';
import { ProductType } from "@/components/Product/ProductItem.component";
import { OrderType } from "./api/orders";

const Container = styled.div`
    display: flex;
    justify-content: space-between;

    .subtotal {
        background: gray;
    }
`
const Admin: NextPageWithLayout = (): JSX.Element => {
  const router = useRouter();
  const { redirect } = router.query;
  const url: any = redirect;
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const { cartItems } = useCartStore();
  const [orders, setOrders] = useState<OrderType & {id: number} []>();
  useEffect(() => {
   axios.post(
		`http://localhost:3000/api/orders/getAllOrders`, {login: "sokol"}
	).then((res) => setOrders(res.data));

  }, [cartItems]);
  return (
    <Container>
       {orders?.map(cos => cos.id)}
    </Container>
  )
}

Admin.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title="Cart">
        <CartLayout>
            {page}
        </CartLayout>
    </Layout>
  )
}
export default Admin;