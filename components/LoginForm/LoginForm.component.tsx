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

export const LoginForm: FC = (): JSX.Element => {



  return (
    <>
       <h1>Signup</h1>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validate={values => {
          type Error = {
            email: string;
            password: string;
          }
          const errors: Error = {email: '', password: ''};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          } 
          if (!values.password) {
            errors.password = 'Required';
          }
          return errors;
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
       {({ isSubmitting }) => (
         <Form>
           <label htmlFor="email">Login</label>
           <Field id="email" type="email" name="email" />
           <ErrorMessage name="email" component="div" />
           <Field type="password" name="password" />
           <ErrorMessage name="password" component="div" />
           <button type="submit" disabled={isSubmitting}>
             Submit
           </button>
         </Form>
       )}
      </Formik>
    </>
  )
}
