import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { BorderRadius } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
import { RolllStateType } from "shared/models/roll"

interface Props {
  type: RolllStateType
  size?: number
  onClick?: () => void
}
export const RollStateIcon: React.FC<Props> = (props) => {
  const { type, size = 20, onClick } = props
  return (
    <S.Icon size={size} border={type === "unmark"} bgColor={getBgColor(type)} clickable={Boolean(onClick)} onClick={onClick}>
      <FontAwesomeIcon icon="check" size={size > 14 ? "lg" : "sm"} />
    </S.Icon>
  )
}

function getBgColor(type: RolllStateType) {
  switch (type) {
    case "unmark":
      return "#fff"
    case "present":
      return "#13943b"
    case "absent":
      return "#9b9b9b"
    case "late":
      return "#f5a623"
    default:
      return "#13943b"
  }
}

const S = {
  Icon: styled.div<{ size: number; border: boolean; bgColor: string; clickable: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background-color: ${({ bgColor }) => bgColor};
    border: 2px solid ${({ border }) => (border ? Colors.dark.lighter : "transparent")};
    border-radius: ${BorderRadius.rounded};
    width: ${({ size }) => size}px;
    height: ${({ size }) => size}px;
    cursor: ${({ clickable }) => (clickable ? "pointer" : undefined)};
  `,
}
