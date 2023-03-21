import Image from "next/image";
import Link from "next/link";
import { ProductType } from "../Product/ProductItem.component";
import { Container, Table } from "../../styles/table";
import Pagination from "rc-pagination";
import { useEffect, useState } from "react";

export const PaginatedProducts = ({items, deleteProduct, editMode}: {items: ProductType[] | any, deleteProduct: (slug: string) => void, editMode: (product: ProductType) => void}) => {
    const countPerPage = 10;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [collection, setCollection] = useState(items?.slice(0, countPerPage));

    const updatePage = (p: any) => {
        setCurrentPage(p);
        const to = countPerPage * p;
        const from = to - countPerPage;
        setCollection(items?.slice(from, to));
    }

    const Product = (): JSX.Element => {
        return (
        <Container>    
            {collection?.length ? 
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
                    {collection?.map((product: ProductType) => (
                        <tr key={product.name}>
                            <td className="id"><Image src={product.image} width={40} height={40} alt={"product img"}></Image></td> 
                            <td>{product.name}</td> 
                            <td>{product.brand}</td>
                            <td>{product.price} PLN</td>
                            <td className="edit"><div id="prodEditBttn" onClick={() => editMode(product)}><Image className="image" src={"/edit_icon.png"} alt="edit icon" width={15} height={15}/></div></td>
                            <td className="delete"><Image src={"/delete_icon.png"} alt="delete icon" width={15} height={15} onClick={() => deleteProduct(product.slug)}/></td>
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

    useEffect(() => {
        setCollection(items?.slice(0, countPerPage));
        setCurrentPage(1);
    }, [items]);
    return (
        <>          
            <Product/>
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