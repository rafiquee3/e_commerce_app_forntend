import styled from "styled-components";
import { CheckoutWizard } from '@/components/Checkout/CheckoutWizard'
import { ShippingLayout } from '@/components/Layout/ShippingLayout.component'
import { ReactElement, useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import type { NextPageWithLayout } from './_app'
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCartStore } from "@/components/Store/store";
import Link from "next/link";
import { ProductType } from "@/components/Product/ProductItem.component";
import { ProductsList } from "@/components/Product/ProductsList.component";
import axios from "axios";

const Container = styled.div`
  .summary {
    border: 1px solid black;
  }
`
const Placeorder: NextPageWithLayout = (): JSX.Element => {
  type Product = ProductType & {quantity: number}
  type ArrayOfProducts = Product[];
  const { data: session } = useSession();
  const { cartItems, shippingAddress, paymentMethod } = useCartStore();
  const [ quantityOfProducts, setQuantityOfProducts] = useState<number>();
  const [ items, setItems] = useState<ArrayOfProducts>();
  const [ address, setAddress ] = useState<any>();
  const [ payment, setPayment ] = useState<string>();
  const [ shipping, setShipping ] = useState<number>(25);
  const [ total, setTotal ] = useState<number>(0);
  const [ totalPrice, setTotalPrice ] = useState<number>();
  const router = useRouter();
  const round = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100;

  useEffect(() => {
    let mounted = true;
    let total: number = cartItems?.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    setQuantityOfProducts(cartItems.length);
    setItems(cartItems);
    setAddress(shippingAddress);
    setPayment(paymentMethod);
    setTotal(round(total));
    setTotalPrice(round(total + shipping));
    if (mounted && !paymentMethod) {
        router.push('/payment');
    }
    return () => { mounted = false }
  }, [cartItems, cartItems.length, paymentMethod, router, shipping, shippingAddress]);

  const placeOrderHandler = async () => {
    try {
      const { data } = await axios.post('/api/orders', {
        products: items?.map((item) => {return `${item.name} ${item.quantity}x ${item.price}PLN`}).join(', '),
        paymentMethod:  payment,
        itemsPrice:     total,
        shippingPrice:  shipping,
        totalPrice:     totalPrice,
        name:           address.location.name,
        surname:        address.location.surname,
        email:          address.location.email,
        address:        address.location.address,
        city:           address.location.city,
        postal:         address.location.postal,
        telephone:      Number(address.location.telephone)
      });

      // dispatch({ type: 'CART_CLEAR_ITEMS' });
      // Cookies.set(
      //   'cart',
      //   JSON.stringify({
      //     ...cart,
      //     cartItems: [],
      //   })
      // );
      // router.push(`/order/${data._id}`);
    } catch (err) {
      //toast.error(getError(err));
    }
  };
  return (
    <>
        <CheckoutWizard activeStep={3}/>
        <Container>
            <h1>Finalizacja zamówienia</h1>
            { quantityOfProducts === 0 ? (
                <div>
                    Koszyk jest pusty, <Link style={{color: 'blue'}} href="/">przejdź do sklepu</Link>
                </div>
            ) : (
              <>
                <div className="summary">
                    <h2>Adres dostawy</h2>
                    <p>{address?.location?.name} {address?.location?.surname}, {address?.location?.address}, {address?.location?.postal}, {address?.location?.city}</p>
                    <Link href={"/shipping"}>Edytuj</Link>
                </div>
                <div className="summary">
                    <h2>Metoda płatności</h2>
                    <p>{payment}</p>
                    <Link href={"/payment"}>Edytuj</Link>
                </div>
                <div className="summary">
                    <h2>Zamawiane produkty</h2>
                    <ProductsList />
                </div>
                <div className="summary">
                    <h2>Podsumowanie</h2>
                    <p>Produkty: {total} PLN</p>
                    <p>Dostawa:  {shipping} PLN</p>
                    <p>Do zapłaty: {totalPrice} PLN</p>
                    <button type="button" onClick={placeOrderHandler}>Zamów</button>
                </div>
              </>
            )}
        </Container>
    </>
  )
}

Placeorder.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title={'shiping'}>
      <ShippingLayout>{page}</ShippingLayout>
    </Layout>
  )
}

export default Placeorder;