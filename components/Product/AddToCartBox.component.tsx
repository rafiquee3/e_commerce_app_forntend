import styled from "styled-components";

const Container = styled.div`
    background-color: gray;
    border: 1px solid black;
`
export const AddToCartBox = ({ price, stock }: {price: number, stock: number}): JSX.Element => {
    return (
        <Container>
            <div>Cena: {price}</div>
            <div>Dostępność: {stock ? 'dostępny' : 'brak w magazynie'}</div>
            <button type="button">Dodaj</button>
        </Container>
    )
}