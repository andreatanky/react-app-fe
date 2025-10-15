import { styled } from '@mui/material/styles'

export const StyledContainer = styled('section', {
  shouldForwardProp: (prop) => prop !== 'blurred',
})<{ blurred: boolean }>(({ theme, blurred }) => ({
  display: 'grid',
  gap: theme.spacing(6),
  filter: blurred ? 'blur(6px)' : 'none',
  transition: 'filter 200ms ease',
  color: theme.palette.surface.on,
}))

export const WrapperLanding = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: theme.spacing(5),
  color: theme.palette.surface.on,
}))

export const Logo = styled('img')(() => ({
  display: 'block',
  width: 'min(100%, 460px)',
  maxWidth: 460,
  aspectRatio: '460 / 56',
  height: 'auto',
  objectFit: 'contain',
  margin: '0 auto',
}))

export const SearchSectionWrapper = styled('div')(() => ({
  width: '100%',
}))

export const SearchSection = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1.5),
}))

export const SearchModePlaceholder = styled('div')(({ theme }) => ({
  minHeight: `clamp(${theme.spacing(18)}, 25vh, ${theme.spacing(28)})`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  paddingBottom: theme.spacing(3),
  zIndex: 0,
  color: theme.palette.surface.on,
}))

export const SearchModeBreadcrumb = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3),
  fontSize: theme.typography.body1.fontSize,
  color: theme.palette.surface.on,
}))

export const SearchModeRoot = styled('span')(({ theme }) => ({
  color: theme.palette.surface.on,
  fontWeight: theme.typography.fontWeightMedium,
}))

export const SearchModeTrail = styled('span')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  color: theme.palette.surface.onVariant,
}))

export const SearchModeDelimiter = styled('span')(({ theme }) => ({
  color: theme.palette.surface.on,
  fontWeight: theme.typography.fontWeightMedium,
}))

export const SearchModeQuery = styled('span')(({ theme }) => ({
  color: theme.palette.surface.onVariant,
}))
