import styled from "styled-components";
import { FC } from 'react';
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import validator from 'validator';
import { useCartStore } from "../Store/store";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

interface Values {
  name: string;
  surname: string;
  email: string;
  address: string;
  city: string;
  postal: string;
  telephone: string;
}
const validateName = (value: string) => {
  let error: string = '';
  if (!validator.isAlpha(value, 'pl-PL')) {
    error = 'Imię powinno składać się wyłącznie z liter'
  }
  if (validator.isEmpty(value)) {
    error = 'Imię jest wymagane'
  }
  return error;
}
const validateSurname = (value: string) => {
  let error: string = '';
  if (!validator.isAlpha(value, 'pl-PL')) {
    error = 'Nazwisko powinno składać się wyłącznie z liter'
  }
  if (validator.isEmpty(value)) {
    error = 'Nazwisko jest wymagane'
  }
  return error;
}
const validateEmail = (value: string) => {
  let error: string = '';
  if (!validator.isEmail(value)) {
    error = 'Niepoprawny adres email';
  }
  return error;
}
const validateAddress = (value: string) => {
  let error: string = '';
  if (validator.isEmpty(value)) {
    error = 'Adres jest wymagany';
  }
  return error;
}
const validateCity = (value: string) => {
  let error: string = '';
  if (!validator.isAlpha(value, 'pl-PL')) {
    error = 'Miasto powinno składać się wyłącznie z liter'
  }
  if (validator.isEmpty(value)) {
    error = 'Miasto jest wymagane'
  }
  return error;
}
const validatePostal = (value: string) => {
  let error: string = '';
  if (!validator.isPostalCode(value, 'PL')) {
    error = 'Niepoprawny kod pocztowy'
  }
  return error;
}
const validateTelephone = (value: string) => {
  let error: string = '';
  if (!validator.isMobilePhone(value, 'pl-PL')) {
    error = 'Niepoprawny numer telefonu'
  }
  return error;
}
const Container = styled.div`
 width: 500px;
 form {
  display: flex;
  flex-direction: column;
  position: relative;

  p {
    color: red;
  }
  .dubble {
    display: flex;
    justify-content: space-between;
    div {
      width: 49%;
      input {
        width: 100%;
      }
    }
  }
 }
`
export const ShippingForm: FC = (): JSX.Element => {
  const { saveAddress } = useCartStore();
  const router = useRouter();
  return (
    <Container>
       <h1>Dane adresowe</h1>
      <Formik
        initialValues={{
          name: '',
          surname: '',
          email: '',
          address: '',
          city: '',
          postal: '',
          telephone: ''
        }}
        onSubmit={async (
          values: Values,
          { resetForm }: FormikHelpers<Values>,
        ) => {
          const address = {
            name: values.name,
            surname: values.surname,
            email: values.email,
            address: values.address,
            city: values.city,
            postal: values.postal,
            telephone: values.telephone
          }
          saveAddress(address);
          Cookies.set('address', JSON.stringify({location: address}));
          toast('Dane zapisano', {style: {background: "green", color: "white"}});
          router.push('/payment');
        }}
      >
       {({ isSubmitting, errors, touched, validateField, validateForm }) => (
         <Form>
           <div className="dubble">
            <div>
              <label htmlFor="name">Imię</label><br/>
              <Field id="name" type="text" name="name" validate={validateName} />
              <ErrorMessage name="name" component="p" />
            </div>
            <div>
              <label htmlFor="surname">Nazwisko</label><br/>
              <Field id="surname" type="text" name="surname" validate={validateSurname} />
              <ErrorMessage name="surname" component="p" />
            </div>
           </div>

           <label htmlFor="email">Email</label>
           <Field id="email" type="email" name="email" validate={validateEmail}/>
           <ErrorMessage name="email" component="p" />
          
           <label htmlFor="address">Adres</label>
           <Field id="address" type="text" name="address" validate={validateAddress}/>
           <ErrorMessage name="address" component="p" />
          
           <div className="dubble">
            <div>
              <label htmlFor="city">Miasto</label><br/>
              <Field id="city" type="text" name="city" validate={validateCity}/>
              <ErrorMessage name="city" component="p" />
            </div>
            <div>
              <label htmlFor="postal">Kod pocztowy</label><br/>
              <Field id="postal" type="text" name="postal" validate={validatePostal}/>
              <ErrorMessage name="postal" component="p" />
            </div>
           </div>
           
           <label htmlFor="telephone">Telefon</label>
           <Field id="telephone" type="text" name="telephone" validate={validateTelephone}/>
           <ErrorMessage name="telephone" component="p" />

           <button type="submit" disabled={isSubmitting}>
             Dalej
           </button>
         </Form>
       )}
      </Formik>
    </Container>
  )
}
