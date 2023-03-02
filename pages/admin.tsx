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

const Container = styled.div`
    display: flex;
    width: 70vw;
    min-height: 60vh;
    background-color: white;
    border-radius: 28px;
    
    ul {
        margin-top: 50px;
        list-style: none;
    }
    h2 {
        margin-top: 20px;
        text-align: center
    }
    li {
        padding: 20px;
    }
    li:hover {
        background-color: #9CC1EA;
    }
    .left {
        width: 30%;
        height: 100%;
        background-color: #648BB4;
        border-bottom-left-radius: 28px;
        border-top-left-radius: 28px;
    }
    .right {

    }
` 
const Admin: NextPageWithLayout = (): JSX.Element => {
  const {cartItems} = useCartStore();
  const [orders, setOrders] = useState<(OrderType & {id: number})[]>();
  const [path, setPath] = useState<String>('orders');

  useEffect(() => {
   axios.post(`http://localhost:3000/api/orders/getAllOrders`)
   .then((res) => setOrders(res.data));

  }, [cartItems]);
  console.log('orderssss: ', orders)
  return (
    <Container>
      <div className="left">
        <h2>Panel administratora</h2>
        <ul>
            <li>
                <Image
                    src="/order_icon.png"
                    alt="Order icon"
                    width={30}
                    height={30}
                />
                Zamówienia
            </li>
            <li> 
                <Image
                    src="/product_icon.png"
                    alt="Product icon"
                    width={30}
                    height={30}
                />
                Produkty
            </li>
            <li> 
                <Image
                    src="/user_icon.png"
                    alt="User icon"
                    width={30}
                    height={30}
                />
                Użytkownicy
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