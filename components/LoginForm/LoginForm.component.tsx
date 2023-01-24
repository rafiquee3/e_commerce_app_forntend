import styled from "styled-components";
import { FC, useRef, useState } from 'react';
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { signIn, useSession } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';

interface Values {
  login: string;
  hash: string;
}
const validateHash = (value: string) => {
  let error: string = '';
  if (!value) {
    error = 'Required';
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
          login: '',
          hash: '',
        }}
        onSubmit={async (
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          try {
            const result = await signIn('credentials', {
              redirect: false,
              login: values.login,
              hash: values.hash,
            });
            if (result?.error) {
              toast.error(result.error);
            }
          } catch (err: any) {
            const msg = err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : err.message; 
            toast.error(msg);
          }
          //setSubmitting(false);
        }}
      >
       {({ isSubmitting, errors, touched, validateField, validateForm }) => (
         <Form>
           <label htmlFor="login">Login</label>
           <Field id="login" type="text" name="login" validate={validateLogin} />
           <ErrorMessage name="login" component="div" />
           <label htmlFor="hash">Password</label>
           <Field id="hash" type="password" name="hash" validate={validateHash}/>
           <ErrorMessage name="hash" component="div" />
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
      </Formik>
      <ToastContainer />
    </Container>
  )
}
