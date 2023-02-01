import Image from "next/image";
import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { CartProductType, useCartStore } from "../Store/store";

const Table = styled.table`
    width: 70%;
    border: none;
    th {
        text-align: right;
    }
    td {
        text-align: right;
    }
    tr {
        border-bottom: 1px solid black;
    }
    .item {
        text-align: left;
    }
`
export const ProductsList: FC = (): JSX.Element => {
    const [total, setTotal] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const { addItem, cartItems, remItem, remRecordItem } = useCartStore();
    const decreaseQuantity = (product: CartProductType) => {
      if (product.quantity === 1) {
          remRecordItem(product);
      } else {
          remItem(product);
      }
    }
    useEffect(() => {
      setQuantity(cartItems.reduce((acc, curr) => acc + curr.quantity, 0));
      setTotal(cartItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0));
    }, [cartItems])
    return (
    <Table>
        <thead>
            <tr>
                <th className="item">Produkt</th>
                <th>Ilość</th>
                <th>Cena</th>
                <th>Usuń</th>
            </tr>
        </thead>
        <tbody>
            {cartItems.map((item) => (
                <tr key={item.name}>
                    <td className="item"><Image src={`${item.image}`} alt={"miniatura produktu"} width={20} height={20}></Image>{item.name}</td>
                    <td>
                        <button type="button" onClick={() => decreaseQuantity(item)}> - </button>
                        {item.quantity}
                        <button type="button" onClick={() => addItem(item)}> + </button>    
                    </td>
                    <td>{item.price}</td>
                    <td><button type='button' onClick={() => remRecordItem(item)}>Usuń</button></td>
                </tr>
            ))}
            <tr style={{border: 'none'}}>
                <td></td>
                <td></td>
                <td></td>
                <td>
                    Suma: {total} PLN
                </td>
            </tr>
        </tbody>
    </Table>
    )
}