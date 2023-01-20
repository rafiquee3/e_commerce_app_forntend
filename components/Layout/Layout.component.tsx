import styled from "styled-components";
import React from 'react'
import { Navbar } from '../Navbar'

export const Layout = ({children}: {children: React.ReactNode}): JSX.Element => {
  const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    width: 100%;
    overflow: hidden;
    line-height: 1.5em;
  `
  return ( 
    <>
      <Navbar/>
      <Main>
        {children}
      </Main>
    </>
  )
}
