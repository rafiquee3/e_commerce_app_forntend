import styled from "styled-components";
import { MainLayout } from '../components/Layout'
import { ReactElement, useEffect } from 'react'
import { Layout } from '../components/Layout'
import type { NextPageWithLayout } from './_app'
import { useRouter } from 'next/router'
import { useCartStore, useNavStore, useUserStore } from '@/components/Store/store'
import { CartLayout } from "@/components/Layout/CartLayout.component";
import Image from "next/image";

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
  const { cartItems } = useCartStore();
  const total = cartItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  const quantity = cartItems.reduce((acc, curr) => acc + curr.quantity, 0) 
  return (
    <Container>
        <Table>
            <thead>
                <tr>
                    <th className="item">Produkt</th>
                    <th>Ilość</th>
                    <th>Cena</th>
                    <th>Usuń</th>
                </tr>
            </thead>
            <tbody>
                {cartItems.map((item) => (
                    <tr key={item.name}>
                        <td className="item"><Image src={`${item.image}`} alt={"miniatura produktu"} width={20} height={20}></Image>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price}</td>
                        <td><button type='button'>Usuń</button></td>
                    </tr>
                
                ))}
                <tr style={{border: 'none'}}>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        Suma: {total} PLN
                    </td>
                </tr>
            </tbody>
        </Table>
        <div className="subtotal">
            <p>Zamówienie({quantity}): {total} PLN</p>
            <button type="button">Zapłać</button>
        </div>
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