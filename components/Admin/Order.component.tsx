import styled from "styled-components";
import { OrderType } from "@/pages/api/orders";
import Image from "next/image";
import Link from "next/link";
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from "react";
import { Container, Table } from "@/styles/table";

type OrderArr = (OrderType & {id: number})[];
export const Order = ({orders}: {orders: OrderArr | undefined}): JSX.Element => {
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
export const PaginatedOrders = ({itemsPerPage, items}) => {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = items?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items?.length / itemsPerPage);
  
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      setItemOffset(newOffset);
    };

    useEffect(() => {
        setItemOffset(0)
    }, [items]);
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
            <Order orders={currentItems} />   
        </>
    );
}