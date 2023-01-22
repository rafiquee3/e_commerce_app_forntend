import styled from "styled-components";
import { useCartStore } from "../Store/store";
import { ProductType } from "./ProductItem.component";

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
            alert('Out of stock');
            return
        } else {
            addItem(product);
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