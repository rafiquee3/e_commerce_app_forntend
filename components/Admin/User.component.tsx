import Image from "next/image";
import Link from "next/link";
import Pagination from "rc-pagination";
import { useEffect, useState } from "react";
import { Container, Table } from "../../styles/table"
import { UserType } from "@/helpers/types";

const User = ({users}: {users: any}): JSX.Element => {
    return (
    <Container>
        { users?.length ?      
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

export const PaginatedUsers = ({itemsPerPage, items}: {itemsPerPage: number, items: UserType[] | any}) => {
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
            <User users={collection} />
            <Pagination
                pageSize={countPerPage}
                onChange={updatePage}
                current={currentPage}
                total={items?.length}
            />
        </>
    );
}

