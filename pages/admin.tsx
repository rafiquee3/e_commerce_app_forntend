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
import { useRef } from "react";

const Container = styled.div`
    display: flex;
    width: 85%;
    min-height: 100vh;
    background-color: white;
    padding: 0px;
    margin: 40px 0;
    border-radius: 25px;

    .left {
        width: 20%;
        height: 100%;
        background-color: #1C34AB;
        color: #8995D7;
        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;

        ul {
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
            background-color: #1C2FA3;
        }
        .adminIcon {
            width: 100%;
            height: 100px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }
    .right {
        width: 80%;
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;

        #search {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 70px;
            
            .searchIcon {
            display: flex;
            width: 400px;   
            border-radius: 12px;
            background: #23C5D1;
            align-items: center;

                img {
                    margin: 7px;
                }
                input {
                    border: none;
                    width: 100%;
                    height: 40px;
                    background: #F9FAFD;
                    border-top-right-radius: 10px;
                    border-bottom-right-radius: 10px;
                    padding: 0 10px;
                    outline: none;
                }
            }
        }
    }
` 
const li_active = {
    background: '#1C2FA3', 
    color: '#D4D8EE',
    borderLeft: '8px solid #23C5D1'
}
const Admin: NextPageWithLayout = (): JSX.Element => {
  const {cartItems} = useCartStore();
  const [orders, setOrders] = useState<(OrderType & {id: number})[]>();
  const [path, setPath] = useState<String>('orders');
  const { data: session, status } = useSession();
  const inputRef = useRef<any>();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = inputRef.current.value;
    const reg = `/.${searchValue}/`;
    console.log("Search: " + text1.search(reg)); //14
    if (path === 'orders') {
        
    }
  };

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
        <div className="adminIcon"><Image src={"/cfg_icon.png"} alt={"config icon"} width={50} height={50}/></div>
        <ul>
            <li style={path === 'orders' ?  li_active : {}} onClick={() => setPath('orders')}>
                <Image
                    src="/order_icon.png"
                    alt="Order icon"
                    width={30}
                    height={30}
                />
                <p>Zamówienia</p>
            </li>
            <li style={path === 'products' ? li_active : {}} onClick={() => setPath('products')}> 
                <Image
                    src="/product_icon.png"
                    alt="Product icon"
                    width={30}
                    height={30}
                />
                <p>Produkty</p>
            </li>
            <li style={path === 'users' ? li_active : {}} onClick={() => setPath('users')}> 
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
        <div id="search"><div className="searchIcon"><Image src={"/search_icon.png"} alt={"seacrh icon"} width={25} height={25}/><input type="text" ref={inputRef} onChange={handleSearch}></input></div></div>
        { path === 'orders' ? <Order orders={orders}/> : 'cos'}
      </div>
    </Container>
  );
}

Admin.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title="Admin">
        <AdminLayout>
            {page}
        </AdminLayout>
    </Layout>
  )
}
export default Admin;