import { OrderType } from "@/pages/api/orders";
import Image from "next/image";
import Pagination from "rc-pagination";
import { useEffect, useState } from "react";
import { Container, Table } from "@/styles/table";
import "rc-pagination/assets/index.css";

export const PaginatedOrders = ({items, editMode, deleteOrder}: {items: (OrderType & {id: number})[] | any, deleteOrder: (orderId: number) => void, editMode: (order: OrderType) => void}) => {
    const countPerPage = 10;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [collection, setCollection] = useState<(OrderType & {id: number})[]>(items?.slice(0, countPerPage));

    const Order = (): JSX.Element => {
        return (
          <Container>    
              {collection?.length ?  
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
                      {collection?.map((order: OrderType | any) => (
                            <tr key={order.id}>
                              <td className="id">{order.id} </td> 
                              <td>{order.name} {order.surname}</td> 
                              <td>{order.email}</td>
                              <td>{order.totalPrice} PLN</td>
                              <td className="edit"><div id="prodEditBttn" onClick={() => editMode(order)}><Image className="image" src={"/edit_icon.png"} alt="edit icon" width={15} height={15}/></div></td>
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
            <Order/>
            {collection?.length ?
            <Pagination
                pageSize={countPerPage}
                onChange={updatePage}
                current={currentPage}
                total={items?.length}
            />
            :
            ''
            }      
        </>
    );
}