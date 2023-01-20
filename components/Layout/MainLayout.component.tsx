import styled from "styled-components";
import React from 'react'

export const MainLayout = ({children}: any): JSX.Element => {
  const Layout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 40px;
    min-height: calc(100vh - 40px - 180px);
    background: rgb(193,214,197);
    background: linear-gradient(122deg, rgba(193,214,197,1) 0%, rgba(215,224,215,1) 35%, rgba(255,255,255,1) 100%);
  `
  return (   
    <Layout>
      {children}
    </Layout>
  )
}