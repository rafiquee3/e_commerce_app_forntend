import styled from "styled-components";
import { FC, useEffect, useState } from 'react';
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

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
  if (!/^[a-zA-Z0-9]+[_]?[a-zA-Z0-9]+$/.test(value)) {
    error = 'login should consist of letters and numbers and may contain _';
  }
  if (!value) {
    error = 'Required';
  }
  if (value.length < 5) {
    error = 'the entered word should contain at least 5 characters';
  }
  if (value.length > 13) {
    error = 'the entered word should contain at max 13 characters';
  }
  return error;
}
const validateSurname = (value: string) => {
  let error: string = '';
  if (!/^[a-zA-Z0-9]+[_]?[a-zA-Z0-9]+$/.test(value)) {
    error = 'login should consist of letters and numbers and may contain _';
  }
  if (!value) {
    error = 'Required';
  }
  if (value.length < 5) {
    error = 'the entered word should contain at least 5 characters';
  }
  if (value.length > 13) {
    error = 'the entered word should contain at max 13 characters';
  }
  return error;
}
const validateEmail = (value: string) => {
  let error: string = '';
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Email incorrect';
  }
  return error;
}
const Container = styled.div`
 form {
  display: flex;
  flex-direction: column;
  position: relative;

  .dubble {
    display: flex;
    justify-content: space-between;
    div {
      width: 47%;
      input {
        width: 100%;
      }
    }
  }
 }
`
const validateAddress = (value: string) => {
  let error: string = '';
  if (!/^[a-zA-Z0-9]+[_]?[a-zA-Z0-9]+$/.test(value)) {
    error = 'login should consist of letters and numbers and may contain _';
  }
  if (!value) {
    error = 'Required';
  }
  if (value.length < 5) {
    error = 'the entered word should contain at least 5 characters';
  }
  if (value.length > 13) {
    error = 'the entered word should contain at max 13 characters';
  }
  return error;
}
const validateCity = (value: string) => {
  let error: string = '';
  if (!/^[a-zA-Z0-9]+[_]?[a-zA-Z0-9]+$/.test(value)) {
    error = 'login should consist of letters and numbers and may contain _';
  }
  if (!value) {
    error = 'Required';
  }
  if (value.length < 5) {
    error = 'the entered word should contain at least 5 characters';
  }
  if (value.length > 13) {
    error = 'the entered word should contain at max 13 characters';
  }
  return error;
}
const validatePostal = (value: string) => {
  let error: string = '';
  if (!/^[a-zA-Z0-9]+[_]?[a-zA-Z0-9]+$/.test(value)) {
    error = 'login should consist of letters and numbers and may contain _';
  }
  if (!value) {
    error = 'Required';
  }
  if (value.length < 5) {
    error = 'the entered word should contain at least 5 characters';
  }
  if (value.length > 13) {
    error = 'the entered word should contain at max 13 characters';
  }
  return error;
}
const validateTelephone = (value: string) => {
  let error: string = '';
  if (!/^[a-zA-Z0-9]+[_]?[a-zA-Z0-9]+$/.test(value)) {
    error = 'login should consist of letters and numbers and may contain _';
  }
  if (!value) {
    error = 'Required';
  }
  if (value.length < 5) {
    error = 'the entered word should contain at least 5 characters';
  }
  if (value.length > 13) {
    error = 'the entered word should contain at max 13 characters';
  }
  return error;
}
export const ShippingForm: FC = (): JSX.Element => {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;
  const url: any = redirect;
  useEffect(() => {
    if (session?.user) {
      router.push(url || '/');
    }
  }, [router, session, redirect, url]);
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
          
        }}
      >
       {({ isSubmitting, errors, touched, validateField, validateForm }) => (
         <Form>
           <div className="dubble">
            <div>
              <label htmlFor="name">Imię</label><br/>
              <Field id="name" type="text" name="name" validate={validateName} />
              <ErrorMessage name="name" component="div" />
            </div>
            <div>
              <label htmlFor="surname">Nazwisko</label><br/>
              <Field id="surname" type="text" name="surname" validate={validateSurname} />
              <ErrorMessage name="surname" component="div" />
            </div>
           </div>

           <label htmlFor="email">Email</label>
           <Field id="email" type="email" name="email" validate={validateEmail}/>
           <ErrorMessage name="email" component="div" />
          
           <label htmlFor="address">Adres</label>
           <Field id="address" type="text" name="address" validate={validateAddress}/>
           <ErrorMessage name="adres" component="div" />
          
           <div className="dubble">
            <div>
              <label htmlFor="city">Miasto</label><br/>
              <Field id="city" type="text" name="city" validate={validateCity}/>
              <ErrorMessage name="city" component="div" />
            </div>
            <div>
              <label htmlFor="postal">Kod pocztowy</label><br/>
              <Field id="postal" type="text" name="postal" validate={validatePostal}/>
              <ErrorMessage name="postal" component="postal" />
            </div>
           </div>
           
           <label htmlFor="telephone">Telefon</label>
           <Field id="telephone" type="text" name="telephone" validate={validateTelephone}/>
           <ErrorMessage name="telephone" component="div" />

           <button type="button" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
      </Formik>
    </Container>
  )
}
