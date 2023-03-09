import Image from "next/image";
import Link from "next/link";
import ReactPaginate from 'react-paginate';
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
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = items?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items?.length / itemsPerPage);
  
    const handlePageClick = (event: React.SyntheticEvent & {selected: number}) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
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
              <User users={currentItems} />   
          </>
    );
  }


