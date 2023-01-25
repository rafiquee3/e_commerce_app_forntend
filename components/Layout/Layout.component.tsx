import styled from "styled-components";
import React, { ReactNode } from 'react'
import { Navbar } from '../Navbar'
import { Footer } from "../Footer";
import Head from "next/head";
import { SessionProvider, useSession } from 'next-auth/react';
import { ToastContainer, toast } from 'react-toastify';

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    min-height: calc(100vh - 40px - 180px);
    overflow: hidden;
    line-height: 1.5em;
`
export const Layout = ({title, children, session}: {title: ReactNode, children: ReactNode, session: any}): JSX.Element => {
  
  return ( 
    <SessionProvider session={session}>
      <Head>
        <title>{title ? title + ' - sklep meblowy' : 'sklep meblowy'}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <Main>
        {children}
      </Main>
      <Footer />
      <ToastContainer />
    </SessionProvider>
  )
}
