import { Layout } from '@/components/Layout'
import { ProductDetailLayout } from '@/components/Layout/ProductDetailLayout.component'
import { AddToCartBox } from '@/components/Product/AddToCartBox.component'
import { ProductType } from '@/components/Product/ProductItem.component'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'
import axios from 'axios';
import { OrderType } from '../api/orders'
import Cookies from "js-cookie";

// enum OrderActionKind {
//   FETCH_REQUEST = 'FETCH_REQUEST',
//   FETCH_SUCCESS = 'FETCH_SUCCESS',
//   FETCH_FAIL = 'FETCH_FAIL',
//   PAY_REQUEST = 'PAY_REQUEST',
//   PAY_SUCCESS = 'PAY_SUCCESS',
//   PAY_FAIL = 'PAY_FAIL',
//   PAY_RESET = 'PAY_RESET'
// }
// type OrderState = {
//   loading: boolean;
//   error: string;
//   successPay: boolean;
//   loadingPay: boolean;
// }
// type OrderAction = {
//   type: OrderActionKind;
//   payload: any;
// }
// function reducer(state: OrderState, action: OrderAction) {
//   switch (action.type) {
//     case OrderActionKind.FETCH_REQUEST:
//       return { ...state, loading: true, error: '' };
//     case OrderActionKind.FETCH_SUCCESS:
//       return { ...state, loading: false, order: action.payload, error: '' };
//     case OrderActionKind.FETCH_FAIL:
//       return { ...state, loading: false, error: action.payload };
//     case OrderActionKind.PAY_REQUEST:
//       return { ...state, loadingPay: true };
//     case OrderActionKind.PAY_SUCCESS:
//       return { ...state, loadingPay: false, successPay: true };
//     case OrderActionKind.PAY_FAIL:
//       return { ...state, loadingPay: false, errorPay: action.payload };
//     case OrderActionKind.PAY_RESET:
//       return { ...state, loadingPay: false, successPay: false, errorPay: '' };

//   //   case 'DELIVER_REQUEST':
//   //     return { ...state, loadingDeliver: true };
//   //   case 'DELIVER_SUCCESS':
//   //     return { ...state, loadingDeliver: false, successDeliver: true };
//   //   case 'DELIVER_FAIL':
//   //     return { ...state, loadingDeliver: false };
//   //   case 'DELIVER_RESET':
//   //     return {
//   //       ...state,
//   //       loadingDeliver: false,
//   //       successDeliver: false,
//   //     };

//     default:
//       state;
//   }
// }
const login = Cookies.get('user');
const OrderScreen: NextPageWithLayout = ({ order }: any): JSX.Element => {
  console.log('madafaka')
  console.log('order', order)
  console.log('user_cookies: ', login)
  return (
    <>
      <p>{order.id}</p>
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

export const getStaticPaths: GetStaticPaths = async () => {
  console.log('heja')
  const orders = await axios.post(
		`http://localhost:3000/api/orders/getAllOrders`, login
	);
  console.log('dsaads')
  const paths = orders.data.map((order: OrderType & { id: string }) => {
    return {
      params: { id: '' + order.id },
    }
  })
  return { paths, fallback: false }
}
export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const order = await axios.get(
		`http://localhost:3000/api/orders/${params.id}`
	);

  return {
    props: {
      order: order.data
    },
  }
}

export default OrderScreen;