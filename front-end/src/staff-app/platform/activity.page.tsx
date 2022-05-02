import React from "react"
import styled from "styled-components"
import { Spacing } from "shared/styles/styles"

export const ActivityPage: React.FC = () => {
  return <S.Container>Activity Page</S.Container>
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 0;
  `,
}
