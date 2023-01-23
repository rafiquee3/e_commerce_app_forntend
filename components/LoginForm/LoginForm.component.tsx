import styled from "styled-components";
//import 'react-app-polyfill/ie11';
import Image from 'next/image'
import { FC, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FontColor } from '../../styles/colors';
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';


interface Values {
  email: string;
  password: string;
}
const validateEmail = (value: string) => {
  let error: string = '';
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
}
const validateLogin = (value: string) => {
  let error: string = '';
  if (!value) {
    error = 'Required';
  }
  return error;
}
const Container = styled.div`
 form {
  display: flex;
  flex-direction: column;
 }
`
export const LoginForm: FC = (): JSX.Element => {



  return (
    <Container>
       <h1>Logowanie</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
       {({ isSubmitting, errors, touched, validateField, validateForm }) => (
         <Form>
           <label htmlFor="email">Login</label>
           <Field id="email" type="email" name="email" validate={validateEmail} />
           <ErrorMessage name="email" component="div" />
           <label htmlFor="password">Password</label>
           <Field id="password" type="password" name="password" validate={validateLogin}/>
           <ErrorMessage name="password" component="div" />
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
      </Formik>
    </Container>
  )
}
