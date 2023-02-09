import Cookies from "js-cookie";
import Image from "next/image";
import { FC, useEffect, useState, useReducer } from "react";
import styled from "styled-components";
import { CartProductType, useCartStore } from "../Store/store";
import { ProductType } from "./ProductItem.component";

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
enum OrderActionKind {
    FETCH_REQUEST = 'FETCH_REQUEST',
    FETCH_SUCCESS = 'FETCH_SUCCESS',
    FETCH_FAIL = 'FETCH_FAIL',
    PAY_REQUEST = 'PAY_REQUEST',
    PAY_SUCCESS = 'PAY_SUCCESS',
    PAY_FAIL = 'PAY_FAIL',
    PAY_RESET = 'PAY_RESET'
}
type OrderState = {
    loading: boolean;
    error: string;
    successPay: boolean;
    loadingPay: boolean;
}
type OrderAction = {
    type: OrderActionKind;
    payload: any;
}
function reducer(state: OrderState, action: OrderAction) {
    switch (action.type) {
      case OrderActionKind.FETCH_REQUEST:
        return { ...state, loading: true, error: '' };
      case OrderActionKind.FETCH_SUCCESS:
        return { ...state, loading: false, order: action.payload, error: '' };
      case OrderActionKind.FETCH_FAIL:
        return { ...state, loading: false, error: action.payload };
      case OrderActionKind.PAY_REQUEST:
        return { ...state, loadingPay: true };
      case OrderActionKind.PAY_SUCCESS:
        return { ...state, loadingPay: false, successPay: true };
      case OrderActionKind.PAY_FAIL:
        return { ...state, loadingPay: false, errorPay: action.payload };
      case OrderActionKind.PAY_RESET:
        return { ...state, loadingPay: false, successPay: false, errorPay: '' };
  
    //   case 'DELIVER_REQUEST':
    //     return { ...state, loadingDeliver: true };
    //   case 'DELIVER_SUCCESS':
    //     return { ...state, loadingDeliver: false, successDeliver: true };
    //   case 'DELIVER_FAIL':
    //     return { ...state, loadingDeliver: false };
    //   case 'DELIVER_RESET':
    //     return {
    //       ...state,
    //       loadingDeliver: false,
    //       successDeliver: false,
    //     };
  
      default:
        state;
    }
}
export const ProductsList: FC = (): JSX.Element => {
    const [total, setTotal] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const { addItem, cartItems, remItem, remRecordItem } = useCartStore();
    
    const decreaseQuantity = (product: CartProductType) => {
        const existItem = cartItems.find((item) => item.slug === product.slug);
        const items =  existItem ? cartItems.filter((item) => item.slug !== existItem.slug) : cartItems;

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