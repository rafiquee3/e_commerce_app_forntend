import styled from "styled-components";
import { ReactElement, useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import type { NextPageWithLayout } from './_app'
import { useCartStore } from '@/components/Store/store'
import axios from 'axios';
import { OrderType } from "./api/orders";
import { AdminLayout } from "@/components/Layout/AdminLayout.component";
import { Order } from "@/components/Admin/Order.component";
import Image from "next/image";
import { useSession } from "next-auth/react"

const Container = styled.div`
    display: flex;
    width: 60vw;
    min-height: 60vh;
    background-color: white;
    border-radius: 28px;

    .left {
        width: 30%;
        height: 100%;
        background-color: #648BB4;
        border-bottom-left-radius: 28px;
        border-top-left-radius: 28px;

        ul {
            margin-top: 35px;
            list-style: none;
        }
        h2 {
            margin-top: 40px;
            text-align: center
        }
        li {
            display: flex;
            padding: 20px;
            cursor: pointer;

            p {
                line-height: 30px;
                padding-left: 10px;
            }
        }
        li:hover {
            background-color: #78AFEA;
        }
    }
    .right {
        width: 70%;
    }
` 
const Admin: NextPageWithLayout = (): JSX.Element => {
  const {cartItems} = useCartStore();
  const [orders, setOrders] = useState<(OrderType & {id: number})[]>();
  const [path, setPath] = useState<String>('orders');
  const { data: session, status } = useSession();

  useEffect(() => {
   axios.post(`http://localhost:3000/api/orders/getAllOrders`)
   .then((res) => setOrders(res.data));

  }, [cartItems]);
  if (!session?.user.isAdmin) {
    return <p>Dostęp tylko dla administratora</p>
  }
  return (
    <Container>
      <div className="left">
        <h2>Panel administratora</h2>
        <ul>
            <li style={path === 'orders' ? {background: '#9CC1EA'} : {}} onClick={() => setPath('orders')}>
                <Image
                    src="/order_icon.png"
                    alt="Order icon"
                    width={30}
                    height={30}
                />
                <p>Zamówienia</p>
            </li>
            <li style={path === 'products' ? {background: '#9CC1EA'} : {}} onClick={() => setPath('products')}> 
                <Image
                    src="/product_icon.png"
                    alt="Product icon"
                    width={30}
                    height={30}
                />
                <p>Produkty</p>
            </li>
            <li style={path === 'users' ? {background: '#9CC1EA'} : {}} onClick={() => setPath('users')}> 
                <Image
                    src="/user_icon.png"
                    alt="User icon"
                    width={30}
                    height={30}
                />
                <p>Użytkownicy</p>
            </li>
        </ul>
      </div>
      <div className="right">
        { path === 'orders' ? <Order orders={orders}/> : 'cos'}
      </div>
    </Container>
  );
}

Admin.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title="Cart">
        <AdminLayout>
            {page}
        </AdminLayout>
    </Layout>
  )
}
export default Admin;