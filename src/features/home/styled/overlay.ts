import { alpha } from '@mui/material/styles'
import styled from '@emotion/styled'

export const PageOverlay = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: alpha(theme.palette.background.default, 0.35),
  backdropFilter: 'blur(6px)',
  pointerEvents: 'auto',
  zIndex: theme.zIndex.modal - 1,
}))
