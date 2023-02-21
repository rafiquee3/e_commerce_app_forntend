import { Layout } from '@/components/Layout'
import { ProductDetailLayout } from '@/components/Layout/ProductDetailLayout.component'
import { ReactElement, useEffect, useState } from 'react'
import { NextPageWithLayout } from '../_app'
import axios from 'axios';
import Cookies from "js-cookie";
import { useRouter } from 'next/router';
import useSWR from "swr";

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
const login = Cookies.get('user');
const OrderScreen: NextPageWithLayout = (): JSX.Element => {
  const { query } = useRouter();
  const orderId = query.id;
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(
    `http://localhost:3000/api/orders/${orderId}`,
    fetcher
  );
  if (error) return <div>Wystąpił błąd podczas ładowania</div>;
  if (!data) return <div>Ładownaie...</div>
  if (data.error) return <div>{data.error}</div>
  return (
    <>
      <h2>Dane zamówienia nr: {data.id}</h2>
      <p>Uzytkownik: {data.authorLogin}</p>
      <p>Produkty: {data.products}</p>
      <p>Metoda płatności: {data.paymentMethod}</p>
      <p>Cena produktów: {data.itemsPrice} PLN</p>
      <p>Cena dostawy: {data.shippingPrice} PLN</p>
      <p>Cena całkowita: {data.totalPrice} PLN</p>
      <p>Dane odbiorcy:</p>
      <p>{data.name} {data.surname}</p>
      <p>{data.address}</p>
      <p>{data.postal} {data.city}</p>
      <p>Nr tel: {data.telephone}</p>
    </>
  )
}

OrderScreen.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title={''}>
      <ProductDetailLayout>{page}</ProductDetailLayout>
    </Layout>
  )
}
export default OrderScreen;