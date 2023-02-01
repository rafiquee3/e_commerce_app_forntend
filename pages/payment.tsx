import styled from "styled-components";
import { CheckoutWizard } from '@/components/Checkout/CheckoutWizard'
import { ShippingLayout } from '@/components/Layout/ShippingLayout.component'
import { ReactElement, SyntheticEvent, useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import type { NextPageWithLayout } from './_app'
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCartStore } from "@/components/Store/store";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Payment: NextPageWithLayout = (): JSX.Element => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>();
  const { data: session } = useSession();
  const router = useRouter();
  const {cartItems, shippingAddress, paymentMethod, savePaymentMethod} = useCartStore();

  useEffect(() => {
    setSelectedPaymentMethod(paymentMethod || '');
    let mounted = true;
    if (mounted && !shippingAddress.location) {
      router.push('/shipping');
      }
    return () => {mounted = false}
  }, [paymentMethod, router, session, shippingAddress.location]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error('Wymagane podanie metody płatności');
    }
    savePaymentMethod(selectedPaymentMethod);
    Cookies.set('paymentMethod', selectedPaymentMethod);
    router.push('/placeorder');
  }
  console.log('adssadsd')
  return (
    <>
        <CheckoutWizard activeStep={2}/>
        <form onSubmit={handleSubmit}>
            <h1>Metoda płatności</h1>
            {
                ['PayPal', 'Karta bankowa', 'Płatność przy odbiorze'].map((payment) => (
                    <div key={payment}>
                        <input 
                        name="paymentMethod"
                        id={payment}
                        type="radio"
                        checked={selectedPaymentMethod === payment}
                        onChange={() => setSelectedPaymentMethod(payment)}
                        />
                    
                        <label htmlFor={payment}>{payment}</label>
                    </div>
                ))
            }
            <div>
                <button>Dalej</button>
                <button type="button" onClick={() => router.push('/shipping')}>Cofnij</button>
            </div>
        </form>
    </>
  )
}

Payment.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title={'payment'}>
      <ShippingLayout>{page}</ShippingLayout>
    </Layout>
  )
}

export default Payment;