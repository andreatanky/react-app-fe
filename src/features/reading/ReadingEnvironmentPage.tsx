import { styled } from '@mui/material/styles'

const Container = styled('section')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  color: theme.palette.surface.on,
}))

export const ReadingEnvironmentPage = () => (
  <Container>
    <header>
      <h1>Reading Environment</h1>
    </header>
  </Container>
)
