import { alpha, styled } from '@mui/material/styles'

export const PageOverlay = styled('div')(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  background: alpha(theme.palette.background.default, 0.35),
  backdropFilter: 'blur(6px)',
  pointerEvents: 'auto',
  zIndex: theme.zIndex.modal - 1,
}))
