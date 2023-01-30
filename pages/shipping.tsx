import styled from "styled-components";
import { CheckoutWizard } from '@/components/Checkout/CheckoutWizard'
import { ShippingLayout } from '@/components/Layout/ShippingLayout.component'
import { ShippingForm } from '../components/ShippingForm/ShippingForm.component'
import { ReactElement, useEffect } from 'react'
import { Layout } from '../components/Layout'
import type { NextPageWithLayout } from './_app'
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Shipping: NextPageWithLayout = (): JSX.Element => {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session?.user) {
      router.push(`/login?redirect=/shipping`);
    }
  }, [router, session]);
  console.log('shipping render')
  return (
    <>
        <CheckoutWizard activeStep={1}/>
        <ShippingForm />
    </>
  )
}

Shipping.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title={'shiping'}>
      <ShippingLayout>{page}</ShippingLayout>
    </Layout>
  )
}

export default Shipping;