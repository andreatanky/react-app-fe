import { styled } from '@mui/material/styles'

export const Page = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: 1200,
  margin: '0 auto',
  padding: `0 clamp(${theme.spacing(2)}, 4vw, ${theme.spacing(6)}) ${theme.spacing(6)}`,
  position: 'relative',
  zIndex: 0,
}))
