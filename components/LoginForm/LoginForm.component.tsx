import styled from "styled-components";
import { FC } from 'react';
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

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
  position: relative;
 }
`
export const LoginForm: FC = (): JSX.Element => {
  const router = useRouter();
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
              toast.error(result.error, {style: {background: "red", color: "white"}});
            } else {
              Cookies.set('user', values.login);
              toast('Logged in', {style: {background: "green", color: "white"}});
              if (values.login === 'admin') {
                return router.push('/admin');
              }
            }
          } catch (err: any) {
            const msg = err.response && err.response.data && err.response.data.message
            ? err.response.data.message
            : err.message; 
            toast.error(msg);
          }
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
           <p>Nie masz załozonego konta, <Link style={{color: "blue"}} href={"/register"}>zarejestruj się</Link></p>
         </Form>
       )}
      </Formik>
    </Container>
  )
}
