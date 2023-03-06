import styled from "styled-components";
import { OrderType } from "@/pages/api/orders";
import Image from "next/image";
import Link from "next/link";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    background: #F9FAFD;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;

    #search {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 70px;
        background: white;
        border-top-right-radius: 25px;

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
                padding-left: 10px;
                outline: none;
            }
        }
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
type OrderArr = (OrderType & {id: number})[];
export const Order = ({orders}: {orders: OrderArr | undefined}): JSX.Element => {
  return (
    <Container>
        <div id="search"><div className="searchIcon"><Image src={"/search_icon.png"} alt={"seacrh icon"} width={25} height={25}/><input></input></div></div>
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
    </Container>
  );
}