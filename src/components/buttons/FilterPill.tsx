import type { ButtonHTMLAttributes } from 'react'
import { styled, type CSSObject } from '@mui/material/styles'

type PillStyleProps = {
  selected?: boolean
  roundLeft?: boolean
  roundRight?: boolean
  joined?: boolean
  showDivider?: boolean
}

export type FilterPillProps = {
  selected?: boolean
  onToggle?: () => void
  label: string
  roundLeft?: boolean
  roundRight?: boolean
  joined?: boolean
  showDivider?: boolean
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'children'>

const PillButton = styled('button', {
  shouldForwardProp: (prop) =>
    !['selected', 'roundLeft', 'roundRight', 'joined', 'showDivider'].includes(
      prop as string,
    ),
})<PillStyleProps>(({ theme, selected, roundLeft, roundRight, joined, showDivider }) => {
  const radius = 999
  const base: CSSObject = {
    appearance: 'none',
    backgroundColor: selected
      ? theme.palette.surface.dim
      : theme.palette.surface.bright,
    color: theme.palette.surface.on,
    border: 0,
    display: 'inline-flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 2),
    borderRadius: radius,
    cursor: 'pointer',
    userSelect: 'none',
    transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color'], {
      duration: theme.transitions.duration.shorter,
    }),
    font: 'inherit',
    outline: 'none',
    '&:hover': {
      backgroundColor: selected
        ? theme.palette.surface.container
        : theme.palette.surface.base,
    },
    '&:focus-visible': {
      boxShadow: `${theme.palette.surface.outline}40 0 0 0 2px`,
    },
  }

  if (roundLeft) {
    base.borderTopLeftRadius = radius
    base.borderBottomLeftRadius = radius
  }

  if (roundRight) {
    base.borderTopRightRadius = radius
    base.borderBottomRightRadius = radius
  }

  if (joined) {
    base.borderRadius = 0
    base.margin = 0
  }

  if (showDivider) {
    base.position = 'relative'
    base['&::before'] = {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      width: 1,
      height: '100%',
      backgroundColor: theme.palette.surface.outline,
    }
  }

  return base
})

const Label = styled('span')(() => ({
  whiteSpace: 'nowrap',
}))

export function FilterPill({
  selected = false,
  onToggle,
  label,
  roundLeft,
  roundRight,
  joined,
  showDivider,
  ...rest
}: FilterPillProps) {
  return (
    <PillButton
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      selected={selected}
      roundLeft={roundLeft}
      roundRight={roundRight}
      joined={joined}
      showDivider={showDivider}
      {...rest}
    >
      <Label>{label}</Label>
    </PillButton>
  )
}
