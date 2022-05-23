import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Button from "@material-ui/core/ButtonBase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { Person } from "shared/models/person"
import { useApi } from "shared/hooks/use-api"
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import { ActiveRollOverlay, ActiveRollAction } from "staff-app/components/active-roll-overlay/active-roll-overlay.component"

export const HomeBoardPage: React.FC = () => {
  const [isRollMode, setIsRollMode] = useState(false)
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })
  const [sortBy, setSortBy] = useState("asc")
  const [sortByName, setSortByName] = useState("first_name")
  const [text, setText] = useState("")
  const [roleStatus, setRoleStatus] = useState({})

  useEffect(() => {
    void getStudents({ sortBy, sortByName, text })
  }, [sortBy, sortByName, text])

  const onToolbarAction = (action: ToolbarAction) => {
    if (action === "roll") {
      setIsRollMode(true)
    }
    if (action === "sort") {
      setSortBy(sortBy === "asc" ? "desc" : "asc")
    }
  }

  const onChangeSortName = (value: string) => {
    setSortByName(value)
  }

  const onActiveRollAction = (action: ActiveRollAction) => {
    if (action === "exit") {
      setIsRollMode(false)
    }
    if (action === "complete") {
      setIsRollMode(false)
    }
  }

  const onChangeText = (value: string) => {
    setText(value)
  }

  const onStateChange = (id: number, value: string) => {
    let status: any = { ...roleStatus }
    status[id] = value
    console.log(value)
    setRoleStatus(status)
  }

  return (
    <>
      <S.PageContainer>
        <Toolbar onItemClick={onToolbarAction} sortByName={sortByName} onChangeSortName={onChangeSortName} onChangeText={onChangeText} text={text} />

        {loadState === "loading" && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}

        {loadState === "loaded" && data?.students && data?.students?.length > 0 && (
          <>
            {data.students.map((s) => (
              <StudentListTile key={s.id} isRollMode={isRollMode} student={s} onStateChange={onStateChange} />
            ))}
          </>
        )}

        {loadState === "error" && (
          <CenteredContainer>
            <div>Failed to load</div>
          </CenteredContainer>
        )}
      </S.PageContainer>
      <ActiveRollOverlay isActive={isRollMode} onItemClick={onActiveRollAction} roleStatus={roleStatus} />
    </>
  )
}

type ToolbarAction = "roll" | "sort"
interface ToolbarProps {
  onItemClick: (action: ToolbarAction, value?: string) => void
  sortByName: string
  onChangeSortName: (value: string) => void
  onChangeText: (value: string) => void
  text: string
}
const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { onItemClick, sortByName, onChangeSortName, onChangeText, text } = props
  return (
    <S.ToolbarContainer>
      <div onClick={() => onItemClick("sort")}>First Name</div>
      <div>
        <select value={sortByName} onChange={(e) => onChangeSortName(e.target.value)}>
          <option value="first_name">First Name</option>
          <option value="last_name">Last Name</option>
        </select>
        <input type="text" placeholder={"Please write for search"} value={text} onChange={(e) => onChangeText(e.target.value)} />
      </div>
      <S.Button onClick={() => onItemClick("roll")}>Start Roll</S.Button>
    </S.ToolbarContainer>
  )
}

const S = {
  PageContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 140px;
  `,
  ToolbarContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-color: ${Colors.blue.base};
    padding: 6px 14px;
    font-weight: ${FontWeight.strong};
    border-radius: ${BorderRadius.default};
  `,
  Button: styled(Button)`
    && {
      padding: ${Spacing.u2};
      font-weight: ${FontWeight.strong};
      border-radius: ${BorderRadius.default};
    }
  `,
}
