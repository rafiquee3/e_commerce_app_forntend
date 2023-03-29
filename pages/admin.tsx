import { ReactElement, useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import type { NextPageWithLayout } from './_app'
import { useCartStore } from '@/components/Store/store'
import axios from 'axios';
import { OrderType } from "./api/orders";
import { AdminLayout } from "@/components/Layout/AdminLayout.component";
import { PaginatedOrders } from "@/components/Admin/Order.component";
import Image from "next/image";
import { useSession } from "next-auth/react"
import { ProductType } from "@/components/Product/ProductItem.component";
import { PaginatedProducts } from "@/components/Admin/Product.component";
import { PaginatedUsers } from "@/components/Admin/User.component";
import { UserType } from "@/helpers/types";
import { Container, li_active } from "../styles/adminPanel"
import { AddProduct } from '@/components/Admin/AddProduct.component';

const Admin: NextPageWithLayout = (): JSX.Element => {
  const {cartItems} = useCartStore();
  const [orders, setOrders] = useState<(OrderType & {id: number})[]>();
  const [products, setProducts] = useState<ProductType[]>();
  const [product, setProduct] = useState<ProductType>();
  const [users, setUsers] = useState<UserType[]>();
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
  const handleClick = (path: String) => {
    setInput(''); 
    setSearch(null); 
    setPath(path);
  }
  const deleteOrder = (orderId: number) => {
    axios.get(`http://localhost:3000/api/orders/${orderId}/delete`);
    const result = orders?.filter(order => order.id !== orderId);
    setInput('');
    if (search) {
        setSearch(result);
    } else {
        setOrders(result);
    }
  };
  const deleteProduct = (slug: string) => {
    axios.get(`http://localhost:3000/api/products/${slug}/delete`);
    const result = products?.filter(product => product.slug !== slug);
    setInput('');
    if (search) {
        setSearch(result);
    } else {
        setProducts(result);
    }
  };
  const deleteUser = (login: string) => {
    axios.get(`http://localhost:3000/api/user/${login}/delete`);
    const result = users?.filter(user => user.login !== login);
    setInput('');
    if (search) {
        setSearch(result);
    } else {
        setUsers(result);
    }
  }
  const editMode = (product: ProductType) => {
    setProduct(product);
    setPath('editProduct');
    setProduct(product);
  }
  const updateProducts = (product: ProductType) => {
    setProduct(product);
  }
  const changePath = (path: string) => {
    setPath(path);
  }
  
  useEffect(() => {
   axios.post(`http://localhost:3000/api/orders/getAllOrders`)
   .then((res) => setOrders(res.data));

   axios.get(`http://localhost:3000/api/products/getAllProducts`)
   .then((res) => setProducts(res.data));

   axios.get(`http://localhost:3000/api/user/getAllUsers`)
   .then((res) => setUsers(res.data));

  }, [cartItems, product]);

  if (!session?.user.isAdmin) {
    return <p style={{margin: "30px"}}>Dostęp tylko dla administratora</p>
  }

  if (search) {
    if (path === 'orders') {
        element = <PaginatedOrders deleteOrder={deleteOrder} items={search}/>
    } else if (path === 'products') {
        element = <PaginatedProducts deleteProduct={deleteProduct} items={search} editMode={editMode}/>
    } else if (path === 'users') {
        element = <PaginatedUsers deleteUser={deleteUser} items={search}/>;
    }
  } else {
    if (path === 'orders') {
        element = <PaginatedOrders deleteOrder={deleteOrder} items={orders}/>
    } else if (path === 'products') {
        element = <PaginatedProducts deleteProduct={deleteProduct} items={products} editMode={editMode}/>
    } else if (path === 'users') {
        element = <PaginatedUsers deleteUser={deleteUser} items={users}/>;
    } else if (path === 'addProduct') {
        element = <AddProduct product={undefined} editMode={false} changePath={changePath} updateProducts={updateProducts}/>;
    } else if (path === 'editProduct') {
        element = <AddProduct product={product} editMode={true} changePath={changePath} updateProducts={updateProducts}/>;
    }
  }

  return (
    <Container>
      <div className="left">
        <div className="adminIcon"><Image src={"/cfg_icon.png"} alt={"config icon"} width={50} height={50}/></div>
        <ul>
            <li style={path === 'orders' ?  li_active : {}} onClick={() => handleClick('orders')}>
                <Image
                    src="/order_icon.png"
                    alt="Order icon"
                    width={30}
                    height={30}
                />
                <p>Zamówienia</p>
            </li>
            <li style={path === 'products' || path === 'editProduct' ? li_active : {}} onClick={() => handleClick('products')}> 
                <Image
                    src="/product_icon.png"
                    alt="Product icon"
                    width={30}
                    height={30}
                />
                <p>Produkty</p>
            </li>
            {
                path === 'products' || path === 'addProduct' ? <li style={path === 'addProduct' ?  li_active : {}} className='productMenu' onClick={() => handleClick('addProduct')}>Dodaj produkt</li> : ''
            }
            <li style={path === 'users' ? li_active : {}} onClick={() => handleClick('users')}> 
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
        <div id="search">
            { path === 'addProduct' ? 
            <div id="addProductTitle">
                <h3>Dodaj produkt</h3>
            </div>          
            : path === 'editProduct' ?
            <div id="addProductTitle">
                <h3>Edycja produktu</h3>
            </div>
            :          
            <div className="searchIcon">
                <Image src={"/search_icon.png"} alt={"seacrh icon"} width={25} height={25}/>
                <input type="text" value={input} onChange={handleSearch}></input>
            </div>
            }
        </div>
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