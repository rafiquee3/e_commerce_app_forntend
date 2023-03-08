import styled from "styled-components";
import { OrderType } from "@/pages/api/orders";
import Image from "next/image";
import Link from "next/link";
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
export const User = ({users}: {users: any}): JSX.Element => {
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