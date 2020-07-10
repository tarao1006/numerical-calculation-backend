import React, { useEffect } from 'react'
import styled, { css } from 'styled-components'
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import GaussSeidelMethodLinearEquation from './linear_equation/gauss_seidel_method'
import JacobMethodLinearEquation from './linear_equation/jacobi_method'
import SorMethodLinearEquation from './linear_equation/sor_method'
import Layout from '../layout'
import Link from '../linkcomposition'
import { siteTitle } from '../title'

const LinearEquation = () => {

  let { url, path } = useRouteMatch()
  return (
    <Layout>
      <Switch>
      <Route exact path={ path }>
          <Root url={ url } />
        </Route>
        <Route path={ `${path}/jacobi_method` } component={ JacobMethodLinearEquation } />
        <Route path={ `${path}/gauss_seidel_method` }>
          <GaussSeidelMethodLinearEquation />
        </Route>
        <Route path={ `${path}/sor_method` }>
          <SorMethodLinearEquation />
        </Route>
      </Switch>
    </Layout>
  )
}

const Root = ({ url }) => {
  if (url.endsWith('/')) {
    url = url.substring(0, url.length - 1)
  }

  useEffect(() => {
    document.title = `連立一次方程式 | ${siteTitle}`
  })

  return (
    <Main>
      <Card>
        <Link to={ `${url}/jacobi_method` }>
          <Method>
            ヤコビ法
          </Method>
        </Link>
      </Card>
      <Card>
        <Link to={ `${url}/gauss_seidel_method` }>
          <Method>
            ガウス・ザイデル法
          </Method>
        </Link>
      </Card>
      <Card>
        <Link to={ `${url}/sor_method` }>
          <Method>
            SOR法
          </Method>
        </Link>
      </Card>
    </Main>
  )
}

export default LinearEquation

const Card = styled.div`
  text-align: center;
  font-size: 15px;
  border-radius: 10px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1), 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
  transition: all 0.25s ease 0s;
  background: white;

  ${props => props.unimplemented && css`
    opacity: 0.4;
  `}

  ${props => !props.unimplemented && css`
    &:hover {
      box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.08), 0px 3px 16px 0px rgba(0, 0, 0, 0.06);
      transform: translateY(-3px);
    }
  `}
`

const Method = styled.span`
  margin: 0 auto;
  width: 100%;
  display: block;
  text-decoration: none;
  padding: 6em 0;

  cursor: ${props => props.unimplemented ? "default" : "pointer"};
  ${props => props.unimplemented && css`
    pointer-events: none;
  `}
`

const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 1fr));
  gap: 15px;
`