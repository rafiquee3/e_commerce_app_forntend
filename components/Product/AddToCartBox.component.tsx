import { toast } from "react-toastify";
import styled from "styled-components";
import { useCartStore } from "../Store/store";
import { ProductType } from "./ProductItem.component";
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
    background-color: gray;
    border: 1px solid black;
`
export const AddToCartBox = ({ product }: {product: ProductType}): JSX.Element => {
    const { cartItems, addItem } = useCartStore();
    const handleClick = () => {
        const existItem = cartItems.find((item) => item.slug === product.slug);
        const item = existItem ? existItem : {...product, quantity: 1}; 
        if ( item.countInStock <= 0 ) {
            toast.error('Brak produktu w magazynie');
            return
        } else {
            addItem(product);
            toast('Dodano produkt', {style: {background: "green", color: "white"}})
        }
    }
    return (
        <Container>
            <div>Cena: {product.price}</div>
            <div>Dostępność: {product.countInStock ? 'dostępny' : 'brak w magazynie'}</div>
            <button onClick={handleClick} type="button">Dodaj</button>
        </Container>
    )
}