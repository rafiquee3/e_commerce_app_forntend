import { CheckoutWizard } from '@/components/Checkout/CheckoutWizard'
import { ShippingLayout } from '@/components/Layout/ShippingLayout.component'
import { ShippingForm } from '@/components/ShippingForm'
import type { ReactElement } from 'react'
import { Layout } from '../components/Layout'
import { FormLayout } from '../components/Layout'
import type { NextPageWithLayout } from './_app'

const Register: NextPageWithLayout = () => {
  return (
    <>
        <CheckoutWizard activeStep={1}/>
        <ShippingForm />
    </>
  )
}

Register.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title={'shiping'}>
      <ShippingLayout>{page}</ShippingLayout>
    </Layout>
  )
}

export default Register;