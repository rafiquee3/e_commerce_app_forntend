import { OrderType } from "@/pages/api/orders";
import Image from "next/image";
import Link from "next/link";
import ReactPaginate from 'react-paginate';
import Pagination from "rc-pagination";
import { useEffect, useState } from "react";
import { Container, Table } from "@/styles/table";
import "rc-pagination/assets/index.css";

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
export const PaginatedOrders = ({itemsPerPage, items}: {itemsPerPage: number, items: (OrderType & {id: number})[] | any}) => {
    // const [itemOffset, setItemOffset] = useState(0);
    // const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    // const currentItems = items?.slice(itemOffset, endOffset);
    // const pageCount = Math.ceil(items?.length / itemsPerPage);
  
    // const handlePageClick = (event: React.SyntheticEvent & {selected: number}) => {
    //   const newOffset = (event.selected * itemsPerPage) % items.length;
    //   setItemOffset(newOffset);
    // };

    // useEffect(() => {
    //     setItemOffset(0)
    // }, [items]);
    const countPerPage = 10;
    //const [value, setValue] = React.useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [collection, setCollection] = useState(items?.slice(0, countPerPage));
    const updatePage = (p) => {
        setCurrentPage(p);
        const to = countPerPage * p;
        const from = to - countPerPage;
        setCollection(items?.slice(from, to));
    }
    useEffect(() => {
        setCollection(items?.slice(0, countPerPage));
        setCurrentPage(1);
    }, [items]);
    return (
        <>          
            <Order orders={collection} />
            <Pagination
                pageSize={countPerPage}
                onChange={updatePage}
                current={currentPage}
                total={items?.length}
            />
        </>
    );
}