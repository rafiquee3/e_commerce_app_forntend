import styled from "styled-components";
import Image from 'next/image'
import Link from "next/link";
import { useCartStore } from "../Store/store";
import { useRouter } from "next/router";

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
    const { cartItems, addItem } = useCartStore();
    const router = useRouter();
    const handleOnClick = (product: ProductType) => {
        const existItem = cartItems.find((item) => item.slug === product.slug);
            const item = existItem ? existItem : {...product, quantity: 1}; 
            if ( item.countInStock <= 0 ) {
                alert('Out of stock');
                return
            } else {
                addItem(product);
                router.push('/')
            }
    }
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
            <button type="button" onClick={() => handleOnClick(product)}>Dodaj</button>
        </Container>
    )
}