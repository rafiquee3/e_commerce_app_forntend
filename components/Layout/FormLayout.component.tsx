import styled from "styled-components";
import React from 'react'

export const FormLayout = ({children}: {children: React.ReactNode}): JSX.Element => {
  const Layout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100vh - 70px);
  `
  return (
    <Layout>
      {children}
    </Layout>
  )
}