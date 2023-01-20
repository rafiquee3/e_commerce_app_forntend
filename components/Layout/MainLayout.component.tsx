import styled from "styled-components";
import React from 'react'

export const MainLayout = ({children}: {children: React.ReactNode}): JSX.Element => {
  const Layout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 70px;
    min-height: calc(100vh - 128px - 70px - 180px);
  `
  return (   
    <Layout>
      {children}
    </Layout>
  )
}