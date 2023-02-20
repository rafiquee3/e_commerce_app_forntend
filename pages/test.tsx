import styled from "styled-components";
import { ReactElement, useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import type { NextPageWithLayout } from './_app'
import { useRouter } from 'next/router'
import { CartProductType, useCartStore, useNavStore, useUserStore } from '@/components/Store/store'
import { CartLayout } from "@/components/Layout/CartLayout.component";
import Image from "next/image";
import { ProductsList } from "@/components/Product/ProductsList.component";
import axios from 'axios';

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
const Test: NextPageWithLayout = (): JSX.Element => {
  const router = useRouter();
  const { redirect } = router.query;
  const url: any = redirect;
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const { cartItems } = useCartStore();
  const [cos, setCos] = useState();
  useEffect(() => {
    axios.post(
		`http://localhost:3000/api/orders/getAllOrders`, {login: "sokol"}
	).then((res) => {
        setCos(res.data);
    });
  }, [cartItems])
  console.log('cos: ', cos);
  return (
    <Container>
       <p>sraka</p>
    </Container>
  )
}

Test.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title="Cart">
        <CartLayout>
            {page}
        </CartLayout>
    </Layout>
  )
}
export default Test;