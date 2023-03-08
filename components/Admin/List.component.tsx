import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import ReactPaginate from 'react-paginate';
import { useState } from "react";
import { OrderType } from "@/pages/api/orders";
import { ProductType } from "../Product/ProductItem.component";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    background: #F9FAFD;
    border-bottom-right-radius: 25px;

    .error {
        margin: 30px;
    }
`
const Table = styled.table`
    width: 70%;
    border-spacing : 1;
    margin-top: 40px;
    margin-bottom: 40px;
    
    th {
        text-align: center;
        background: #F9FAFD;
        color: black;
    }
    td {
        text-align: center;
        position: relative;
        a {
            width: 200px;
            background: red;
        }
        img {
            margin: 0;
            position: absolute;
            top: 50%;
            left: 50%;
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
        }
    }
    tr {
       height: 60px;
       margin: 5px;
       background: white;

       .id {
            padding-left: 10px;
            padding-right: 10px;
       }
       .edit {
            padding-left: 10px;
            padding-right: 10px;
       }
       .delete {
            padding-left: 10px;
            padding-right: 10px;
       }
    }
    thead tr:first-child {
        height: 40px;
    }
    tr:hover {
        border-left: 5px solid black;
    }
    tbody {
        tr:nth-child(even) {
            background: #DEDEDE;
        }
    }
    .item {
        text-align: left;
    }
`
const User = ({users}: {users: any}): JSX.Element => {
    return (
    <Container>
        { users.length ?      
        <Table>           
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Imię i nazwisko</th>
                    <th>Login</th>
                    <th>Email</th>
                    <th>Edytuj</th>
                    <th>Usuń</th>
                </tr>
            </thead>
            <tbody>
                {users?.map((user: any) => (
                    <tr key={user.id}>
                        <td className="id">{user.id}</td> 
                        <td>{user.name} {user.surname}</td> 
                        <td>{user.login}</td>
                        <td>{user.email}</td>
                        <td className="edit"><Link href={`/order/${user.name}`}><Image className="image" src={"/edit_icon.png"} alt="edit icon" width={15} height={15}/></Link></td>
                        <td className="delete"><Image src={"/delete_icon.png"} alt="delete icon" width={15} height={15}/></td>
                    </tr>)).reverse()
                }
            </tbody>
        </Table>
        :
        <div className="error">Brak szukanego użytkownika</div>
        }
    </Container>
  );
}
type OrderArr = (OrderType & {id: number})[];
const Order = ({orders}: {orders: OrderArr | undefined}): JSX.Element => {
  return (
    <Container>    
        { orders?.length ?  
        <Table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Odbiorca</th>
                    <th>Email</th>
                    <th>Total</th>
                    <th>Edytuj</th>
                    <th>Usuń</th>
                </tr>
            </thead>
            <tbody>
                {orders?.map((order: OrderType & {id: number}) => (
                    <tr key={order.id}>
                        <td className="id">{order.id} </td> 
                        <td>{order.name} {order.surname}</td> 
                        <td>{order.email}</td>
                        <td>{order.totalPrice} PLN</td>
                        <td className="edit"><Link href={`/order/${order.id}`}><Image className="image" src={"/edit_icon.png"} alt="edit icon" width={15} height={15}/></Link></td>
                        <td className="delete"><Image src={"/delete_icon.png"} alt="delete icon" width={15} height={15}/></td>
                        </tr>)).reverse()
                }
            </tbody>
        </Table> 
        :
        <div className="error">Brak szukanego zamówienia</div>
        }
    </Container>
  );
}
const Product = ({products}: {products: ProductType[] | undefined}): JSX.Element => {
    return (
    <Container>    
        {products?.length ? 
        <Table>
            <thead>
                <tr>
                    <th></th>
                    <th>Nazwa</th>
                    <th>Marka</th>
                    <th>Cena</th>
                    <th>Edytuj</th>
                    <th>Usuń</th>
                </tr>
            </thead>
            <tbody>
                {products?.map((product: ProductType) => (
                    <tr key={product.name}>
                        <td className="id"><Image src={product.image} width={40} height={40} alt={"product img"}></Image></td> 
                        <td>{product.name}</td> 
                        <td>{product.brand}</td>
                        <td>{product.price} PLN</td>
                        <td className="edit"><Link href={`/order/${product.slug}`}><Image className="image" src={"/edit_icon.png"} alt="edit icon" width={15} height={15}/></Link></td>
                        <td className="delete"><Image src={"/delete_icon.png"} alt="delete icon" width={15} height={15}/></td>
                    </tr>)).reverse()
                }
            </tbody>
        </Table>
        :
        <div className="error">Brak szukanego produktu</div>
        }
    </Container>
  );
}

export const PaginatedItems = ({itemsPerPage, items, path}) => {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
        <>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="<"
                className="pagination"
                containerClassName="container"
                pageClassName="li"
                pageLinkClassName="link"
                activeClassName="active"
                previousClassName="previous"
                nextClassName="next"          
            />
            {
                path === "users" ? <User users={currentItems} /> : path === "products" ? <Product products={currentItems}/> : path === "orders" ? <Order orders={currentItems}/> : ''
            }    
        </>
  );
}
