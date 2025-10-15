import type { PropsWithChildren } from 'react'
import styled from '@emotion/styled'

interface LabelProps {
  text: string
  backgroundColor?: string
  textColor?: string
  className?: string
}

const StyledLabel = styled('span', {
  shouldForwardProp: (prop) =>
    prop !== '$backgroundColor' && prop !== '$textColor',
})<{
  $backgroundColor?: string
  $textColor?: string
}>(({ theme, $backgroundColor, $textColor }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  padding: theme.spacing(0.25, 1),
  borderRadius: theme.shape.borderRadius,
  fontSize: '0.85rem',
  fontWeight: 400,
  letterSpacing: '0.045em',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
  backgroundColor: $backgroundColor ?? theme.palette.surface.base,
  color: $textColor ?? theme.palette.surface.on,
}))
  
export const Label = ({
  text,
  backgroundColor,
  textColor,
  className,
}: PropsWithChildren<LabelProps>) => {
  return (
    <StyledLabel
      className={className}
      $backgroundColor={backgroundColor}
      $textColor={textColor}
    >
      {text.toUpperCase()}
    </StyledLabel>
  )
}

export default Label
