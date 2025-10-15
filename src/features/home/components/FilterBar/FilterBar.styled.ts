import { styled } from '@mui/material/styles'

export const Bar = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: `${theme.spacing(1.25)} ${theme.spacing(1.5)}`,
  alignItems: 'center',
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
