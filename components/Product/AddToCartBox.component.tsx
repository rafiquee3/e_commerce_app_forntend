import styled from "styled-components";
import { useCartStore } from "../Store/store";
import { ProductType } from "./ProductItem.component";

const Container = styled.div`
    background-color: gray;
    border: 1px solid black;
`
export const AddToCartBox = ({ product }: {product: ProductType}): JSX.Element => {
    const { addItem } = useCartStore();
    return (
        <Container>
            <div>Cena: {product.price}</div>
            <div>Dostępność: {product.countInStock ? 'dostępny' : 'brak w magazynie'}</div>
            <button onClick={() => addItem(product)} type="button">Dodaj</button>
        </Container>
    )
}