import React from "react"
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { Colors } from "shared/styles/colors"
import { FontWeight } from "shared/styles/styles"

export const Header: React.FC = () => {
  return (
    <S.Header>
      <S.HeaderItems>
        <NavItem to="/">Orah</NavItem>
        <NavItem to="daily-care">Daily Care</NavItem>
        <NavItem to="activity">Activity</NavItem>
      </S.HeaderItems>
    </S.Header>
  )
}

const NavItem: React.FC<{ to: string }> = (props) => {
  const activeStyle = ({ isActive }: { isActive: boolean }) => ({
    textDecoration: "none",
    fontWeight: FontWeight.strong,
    color: "#fff",
    padding: "18px 20px 17px",
    backgroundColor: isActive ? "#1b4f90" : Colors.blue.base,
  })
  return (
    <NavLink to={props.to} style={activeStyle}>
      {props.children}
    </NavLink>
  )
}

const S = {
  Header: styled.header`
    display: flex;
    align-items: center;
    height: 56px;
    background-color: ${Colors.blue.base};
    color: #fff;
  `,
  HeaderItems: styled.nav`
    display: flex;
    height: 100%;
  `,
}
