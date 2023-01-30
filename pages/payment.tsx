import styled from "styled-components";
import { CheckoutWizard } from '@/components/Checkout/CheckoutWizard'
import { ShippingLayout } from '@/components/Layout/ShippingLayout.component'
import { ReactElement, useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import type { NextPageWithLayout } from './_app'
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Payment: NextPageWithLayout = (): JSX.Element => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>();
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session?.user) {
      router.push(`/login?redirect=/payment`);
    }
  }, [router, session]);
  return (
    <>
        <CheckoutWizard activeStep={2}/>
        <form>
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
                <button onClick={() => router.push('/shipping')}>Cofnij</button>
            </div>
        </form>
    </>
  )
}

Payment.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title={'shiping'}>
      <ShippingLayout>{page}</ShippingLayout>
    </Layout>
  )
}

export default Payment;