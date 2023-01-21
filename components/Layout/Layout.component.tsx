import styled from "styled-components";
import React from 'react'
import { Navbar } from '../Navbar'
import { Footer } from "../Footer";
import Head from "next/head";

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    overflow: hidden;
    line-height: 1.5em;
`
export const Layout = ({title, children}): JSX.Element => {
  
  return ( 
    <>
    
      <Navbar/>
      <Main>
        {children}
      </Main>
      <Footer />
    </>
  )
}
