import styled from '@emotion/styled'

export const Bar = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: `${theme.spacing(1.25)} ${theme.spacing(1.5)}`,
  alignItems: 'center',
}))

export const SegmentGroup = styled('div')(({ theme }) => ({
  display: 'inline-flex',
  borderRadius: 999,
  overflow: 'hidden',
  gap: 0,
  '& > *': {
    margin: 0,
  },
  '& > *:not(:last-child)': {
    position: 'relative',
  },
}))

export const ClearButton = styled('button')(({ theme }) => ({
  appearance: 'none',
  background: 'transparent',
  opacity: 0.85,
  border: 0,
  borderRadius: 999,
  color: theme.palette.surface.onVariant,
  padding: theme.spacing(0.5, 2),
  cursor: 'pointer',
  font: 'inherit',
  transition: theme.transitions.create(['background-color', 'opacity'], {
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': {
    opacity: 1,
    background: theme.palette.surface.outlineVariant,
  },
}))
