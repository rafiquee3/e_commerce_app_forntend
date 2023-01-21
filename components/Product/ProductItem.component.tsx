import styled from "styled-components";
import Image from 'next/image'
import Link from "next/link";

export type ProductType = {
    name: string;
    slug: string;
    category: string;
    image: string;
    price: number;
    brand: string;
    rating: number;
    numReviews: number;
    countInStock: number;
    description: string;
    isFeatured: boolean;
}
const Container = styled.li`
    background-color: gray;
    list-style-type: none;
    width: 220px;
`
export const ProductItem = (product: ProductType): JSX.Element => {
    return (
        <Container>
            <Link href={`/product/${product.slug}`}>
                <Image 
                src={product.image} 
                alt={""}
                width={220}
                height={220}
                >
                </Image>
            </Link>
            <div>
                <Link href={`/product/${product.slug}`}>
                {product.name}
                </Link>
            </div>
            <div>{product.brand}</div>
            <div>{product.price} pln</div>
            <button type="button">Dodaj</button>
        </Container>
    )
}