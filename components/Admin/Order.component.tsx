import { OrderType } from "@/pages/api/orders";
import Image from "next/image";
import Link from "next/link";
import Pagination from "rc-pagination";
import { useEffect, useState } from "react";
import { Container, Table } from "@/styles/table";
import "rc-pagination/assets/index.css";
import axios from 'axios';

type OrderArr = (OrderType & {id: number})[];
export const Order = ({orders}: {orders: OrderArr | undefined}): JSX.Element => {
  const deleteOrder = (orderId: number) => {
    axios.get(`http://localhost:3000/api/orders/${orderId}/delete`);
  }
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
                        <td className="delete"><Image src={"/delete_icon.png"} alt="delete icon" width={15} height={15} onClick={() => deleteOrder(order.id)}/></td>
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
    const countPerPage = 10;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [collection, setCollection] = useState(items?.slice(0, countPerPage));

    const updatePage = (p: any) => {
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