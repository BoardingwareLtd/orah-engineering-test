import React from "react"
import styled from "styled-components"
import Button from "@material-ui/core/Button"
import { BorderRadius, Spacing } from "shared/styles/styles"
import { RollStateList } from "staff-app/components/roll-state/roll-state-list.component"

export type ActiveRollAction = "complete" | "exit"
interface Props {
  isActive: boolean
  onItemClick: (action: ActiveRollAction, value?: string) => void
  roleStatus: any
}

export const ActiveRollOverlay: React.FC<Props> = (props) => {
  const { isActive, onItemClick, roleStatus } = props
  let presentLength = Object.keys(roleStatus).filter((key) => {
    if (roleStatus[key] === "present") {
      return key
    }
  }).length
  let lateLength = Object.keys(roleStatus).filter((key) => {
    if (roleStatus[key] === "late") {
      return key
    }
  }).length
  let absentLength = Object.keys(roleStatus).filter((key) => {
    if (roleStatus[key] === "absent") {
      return key
    }
  }).length

  return (
    <S.Overlay isActive={isActive}>
      <S.Content>
        <div>Class Attendance</div>
        <div>
          <RollStateList
            stateList={[
              { type: "all", count: Object.keys(roleStatus).length },
              { type: "present", count: presentLength },
              { type: "late", count: lateLength || 0 },
              { type: "absent", count: absentLength || 0 },
            ]}
          />
          <div style={{ marginTop: Spacing.u6 }}>
            <Button color="inherit" onClick={() => onItemClick("exit")}>
              Exit
            </Button>
            <Button color="inherit" style={{ marginLeft: Spacing.u2 }} onClick={() => onItemClick("complete")}>
              Complete
            </Button>
          </div>
        </div>
      </S.Content>
    </S.Overlay>
  )
}

const S = {
  Overlay: styled.div<{ isActive: boolean }>`
    position: fixed;
    bottom: 0;
    left: 0;
    height: ${({ isActive }) => (isActive ? "120px" : 0)};
    width: 100%;
    background-color: rgba(34, 43, 74, 0.92);
    backdrop-filter: blur(2px);
    color: #fff;
  `,
  Content: styled.div`
    display: flex;
    justify-content: space-between;
    width: 52%;
    height: 100px;
    margin: ${Spacing.u3} auto 0;
    border: 1px solid #f5f5f536;
    border-radius: ${BorderRadius.default};
    padding: ${Spacing.u4};
  `,
}
