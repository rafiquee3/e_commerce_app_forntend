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
import { ProductType } from "@/components/Product/ProductItem.component";
import { Product } from "@/components/Admin/Product.component";
import { PaginatedItems } from "@/components/Admin/List.component";

const Container = styled.div`
    display: flex;
    min-width: 950px;
    min-height: 100vh;
    width: 85%;
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
const Admin = (): JSX.Element => {
  const {cartItems} = useCartStore();
  const [orders, setOrders] = useState<(OrderType & {id: number})[]>();
  const [products, setProducts] = useState<ProductType[]>();
  const [users, setUsers] = useState<any>();
  const [input, setInput] = useState<any>('');
  const [search, setSearch] = useState<any>();
  const [path, setPath] = useState<String>('orders');
  const { data: session, status } = useSession();
  let element;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    const reg = new RegExp(`${searchValue}`,"gi");

    if (path === 'orders') {
        const result = orders?.filter((order) => {
            const data = `${order.id} ${order.name} ${order.surname} ${order.email} ${order.telephone}`;
            const result = data.search(reg);

            return result >= 0 ? true : false; 
        });
        setInput(searchValue);
        setSearch(result);
    }
    else if (path === 'products') {
        const result = products?.filter((product) => {
            const data = `${product.name} ${product.brand} ${product.price}`;
            const result = data.search(reg);

            return result >= 0 ? true : false; 
        });
        setInput(searchValue);
        setSearch(result);
    }
    else if (path === 'users') {
        const result = users?.filter((user) => {
            const data = `${user.name} ${user.surname} ${user.login} ${user.email}`;
            const result = data.search(reg);

            return result >= 0 ? true : false; 
        });
        setInput(searchValue);
        setSearch(result);
    }
  };

  useEffect(() => {
   axios.post(`http://localhost:3000/api/orders/getAllOrders`)
   .then((res) => setOrders(res.data));

   axios.get(`http://localhost:3000/api/products/getAllProducts`)
   .then((res) => setProducts(res.data));

   axios.get(`http://localhost:3000/api/user/getAllUsers`)
   .then((res) => setUsers(res.data));

  }, [cartItems]);

  if (!session?.user.isAdmin) {
    return <p>Dostęp tylko dla administratora</p>
  }

  if (search) {
    if (path === 'orders') {
        element = <PaginatedItems itemsPerPage={8} items={search} path="orders"/>
    } else if (path === 'products') {
        element = <PaginatedItems itemsPerPage={8} items={search} path="products"/>
    } else if (path === 'users') {
        element = <PaginatedItems itemsPerPage={8} items={search} path="users"/>
    }
  } else {
    if (path === 'orders') {
        element = <PaginatedItems itemsPerPage={8} items={orders} path="orders"/>
    } else if (path === 'products') {
        element = <PaginatedItems itemsPerPage={8} items={products} path="products"/>
    } else if (path === 'users') {
        element = <PaginatedItems itemsPerPage={2} items={users} path="users"/>
    }
  }
  console.log('products::', users)
  return (
    <Container>
      <div className="left">
        <div className="adminIcon"><Image src={"/cfg_icon.png"} alt={"config icon"} width={50} height={50}/></div>
        <ul>
            <li style={path === 'orders' ?  li_active : {}} onClick={() => {setInput(''); setSearch(null); setPath('orders')}}>
                <Image
                    src="/order_icon.png"
                    alt="Order icon"
                    width={30}
                    height={30}
                />
                <p>Zamówienia</p>
            </li>
            <li style={path === 'products' ? li_active : {}} onClick={() => {setInput(''); setSearch(null); setPath('products')}}> 
                <Image
                    src="/product_icon.png"
                    alt="Product icon"
                    width={30}
                    height={30}
                />
                <p>Produkty</p>
            </li>
            <li style={path === 'users' ? li_active : {}} onClick={() => {setInput(''); setSearch(null); setPath('users')}}> 
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
        <div id="search"><div className="searchIcon"><Image src={"/search_icon.png"} alt={"seacrh icon"} width={25} height={25}/><input type="text" value={input} onChange={handleSearch}></input></div></div>
       {element}
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