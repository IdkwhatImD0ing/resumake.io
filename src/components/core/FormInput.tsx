import { useState, CSSProperties } from 'react'
import styled from 'styled-components'

import { StyledInput } from './Input'
import { MiniButton } from './Button'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 12px;
`

interface FormInputProps {
  onSubmit: (value: string) => void
  style?: CSSProperties
}

export function FormInput({ onSubmit, style }: FormInputProps) {
  const [value, setValue] = useState('')

  return (
    <Container style={style}>
      <StyledInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{ gridColumn: '1/4', gridRow: '1/1', paddingRight: 96 }}
      />
      <MiniButton
        type="button"
        onClick={() => onSubmit(value)}
        style={{ gridArea: '1/2' }}
      >
        Add
      </MiniButton>
    </Container>
  )
}
