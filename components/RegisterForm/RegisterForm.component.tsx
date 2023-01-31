import styled from "styled-components";
import { FC, useEffect, useState } from 'react';
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { UserType } from "@/pages/api/auth/create";

interface Values {
  login: string;
  hash: string;
  email: string;
  name: string;
  surname: string;
}
const validateHash = (value: string) => {
  let error: string = '';
  if (!/^[a-zA-Z0-9]+[_]?[a-zA-Z0-9]+$/.test(value)) {
    error = 'password should consist of letters and numbers and may contain _';
  }
  if (!value) {
    error = 'Required';
  } 
  if (value.length < 5) {
    error = 'the entered password should contain at least 5 characters';
  }
  if (value.length > 13) {
    error = 'the entered password should contain at max 13 characters';
  }
  return error;
}
const validateLogin = (value: string) => {
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
 }
`
export const RegisterForm: FC = (): JSX.Element => {
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
       <h1>Rejestracja</h1>
      <Formik
        initialValues={{
          login: '',
          hash: '',
          email: '',
          name: '',
          surname: ''
        }}
        onSubmit={async (
          values: Values,
          { resetForm }: FormikHelpers<Values>,
        ) => {
          const data: UserType = {
            login: values.login,
            email: values.email,
            hash: values.hash,
            name: values.name,
            surname: values.surname
          }
          axios.post('http://localhost:3000/api/auth/create', data)
          .then((res) => {
            toast('Success', {style: {background: "green", color: "white"}})
            resetForm();
          })
          .catch((err) => {
            toast.error(err.response.data.error[0].error
            , {style: {background: "red", color: "white"}});
          });
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

           <label htmlFor="email">Email</label>
           <Field id="email" type="email" name="email" validate={validateEmail}/>
           <ErrorMessage name="email" component="div" />

           <label htmlFor="name">Name</label>
           <Field id="name" type="text" name="name" />
           <ErrorMessage name="name" component="div" />

           <label htmlFor="surname">Surname</label>
           <Field id="surname" type="text" name="surname" />
           <ErrorMessage name="surname" component="div" />

           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
      </Formik>
    </Container>
  )
}
