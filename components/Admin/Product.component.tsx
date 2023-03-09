import Image from "next/image";
import Link from "next/link";
import { ProductType } from "../Product/ProductItem.component";
import { Container, Table } from "../../styles/table";
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from "react";

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

export const PaginatedProducts = ({itemsPerPage, items}: {itemsPerPage: number, items: ProductType[] | any}) => {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = items?.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(items?.length / itemsPerPage);
  
    const handlePageClick = (event: React.SyntheticEvent & {selected: number}) => {
      const newOffset = (event.selected * itemsPerPage) % items.length;
      setItemOffset(newOffset);
    };
    useEffect(() => {
        setItemOffset(0);
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
              <Product products={currentItems} />   
          </>
    );
}