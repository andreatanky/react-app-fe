import type { CSSProperties, PropsWithChildren } from 'react'
import { styled } from '@mui/material/styles'

interface LabelProps {
  text: string
  backgroundColor?: string
  textColor?: string
  className?: string
  style?: CSSProperties
}

const StyledLabel = styled('span')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  padding: theme.spacing(0.25, 1),
  borderRadius: theme.shape.borderRadius,
  fontSize: '0.75rem',
  fontWeight: 500,
  letterSpacing: '0.045em',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
  background: `${theme.palette.surface.on}24`,
  color: theme.palette.surface.on,
}))

export const Label = ({
  text,
  backgroundColor,
  textColor,
  className,
  style,
}: PropsWithChildren<LabelProps>) => {
  const inlineStyles: CSSProperties = {
    ...style,
  }

  if (backgroundColor) {
    inlineStyles.backgroundColor = backgroundColor
  }

  if (textColor) {
    inlineStyles.color = textColor
  }

  return (
    <StyledLabel className={className} style={inlineStyles}>
      {text.toUpperCase()}
    </StyledLabel>
  )
}

export default Label
