import styled from "styled-components";
import { OrderType } from "@/pages/api/orders";
import Image from "next/image";

const Container = styled.div`
    width: 100%;
    ul {
        margin-top: 35px;
        list-style: none;
    }
    h2 {
        margin-top: 40px;
        margin-left: 30px;
    }
    ul {
        list-style: none;
        li {
            padding: 15px;
            .id {
                padding: 15px;
            }
        }
        li:nth-child(odd) {
            background: #C7C7C7;
        }
   }
`
const Table = styled.table`
    width: 100%;
    border: none;
    border-spacing : 0;
    
    th {
        text-align: center;
        background: #28303C;
        color: white;
    }
    td {
        text-align: center;
        
    }
    tr {
       height: 40px;
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
type OrderArr = (OrderType & {id: number})[];
export const Order = ({orders}: {orders: OrderArr | undefined}): JSX.Element => {
  return (
    <Container>
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
                        <td><Image src={"/edit_icon.png"} alt="edit icon" width={15} height={15}/></td>
                        <td><Image src={"/delete_icon.png"} alt="delete icon" width={15} height={15}/></td>
                    </tr>)).reverse()
                }
            </tbody>
        </Table>
    </Container>
  );
}