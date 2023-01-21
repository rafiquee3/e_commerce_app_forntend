import styled from "styled-components";
import React, { ReactNode } from 'react'
import { Navbar } from '../Navbar'
import { Footer } from "../Footer";
import Head from "next/head";

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    overflow: hidden;
    line-height: 1.5em;
`
export const Layout = ({title, children}: {title: ReactNode, children: ReactNode}): JSX.Element => {
  
  return ( 
    <>
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
    </>
  )
}
