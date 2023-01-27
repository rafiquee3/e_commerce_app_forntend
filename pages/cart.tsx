import styled from "styled-components";
import { ReactElement, useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import type { NextPageWithLayout } from './_app'
import { useRouter } from 'next/router'
import { CartProductType, useCartStore, useNavStore, useUserStore } from '@/components/Store/store'
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
  const { redirect } = router.query;
  const url: any = redirect;
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const { addItem, cartItems, remItem, remRecordItem } = useCartStore();
  const decreaseQuantity = (product: CartProductType) => {
    if (product.quantity === 1) {
        remRecordItem(product);
    } else {
        remItem(product);
    }
  }
  useEffect(() => {
    setQuantity(cartItems.reduce((acc, curr) => acc + curr.quantity, 0));
    setTotal(cartItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0));
  }, [cartItems])
  const handlePayment = () => {
    router.push(url || `/shipping?redirect=${'/cart'}`);
  }
  return (
    <Container>
        {quantity ? 
        <>
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
                            <td>
                                <button type="button" onClick={() => decreaseQuantity(item)}> - </button>
                                {item.quantity}
                                <button type="button" onClick={() => addItem(item)}> + </button>    
                            </td>
                            <td>{item.price}</td>
                            <td><button type='button' onClick={() => remRecordItem(item)}>Usuń</button></td>
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