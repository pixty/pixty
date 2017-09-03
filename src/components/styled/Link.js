import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
  a {
    color: #ccc;
    text-decoration: none;
    font-size: 12px;
  }

  a:hover {
    color: white;
  }
`

const StyledLink = ({...props}) => (
  <Wrapper><Link {...props}/></Wrapper>
)

export default StyledLink;