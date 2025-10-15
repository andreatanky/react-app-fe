import { createTheme } from '@mui/material/styles'

const paletteValues = {
  surface: {
    base: '#1C4675',
    bright: '#295F90',
    dim: '#081B34',
    containerLowest: '#1A1B1D',
    containerLow: '#081B34',
    container: '#102F55',
    containerHigh: '#1C4675',
    containerHighest: '#295F90',
    on: '#FFFFFF',
    onVariant: '#9FC7E0',
    outline: '#3A79A9',
    outlineVariant: '#295F90',
    inverse: '#FFFFFF',
    inverseOn: '#081B34',
  },
  tones: {
    primary: '#1C4675',
    onPrimary: '#FFFFFF',
    primaryContainer: '#1C4675',
    onPrimaryContainer: '#1C4675',
    secondary: '#C34D4B',
  },
}

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: paletteValues.surface.containerLow,
      paper: paletteValues.surface.container,
    },
    text: {
      primary: paletteValues.surface.on,
      secondary: paletteValues.surface.onVariant,
    },
    primary: {
      main: paletteValues.tones.primary,
      contrastText: paletteValues.tones.onPrimary,
    },
    secondary: {
      main: paletteValues.tones.secondary,
      contrastText: paletteValues.surface.on,
    },
    surface: paletteValues.surface,
    tones: paletteValues.tones,
  },
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: paletteValues.surface.containerLow,
      paper: paletteValues.surface.container,
    },
    text: {
      primary: paletteValues.surface.on,
      secondary: paletteValues.surface.onVariant,
    },
    primary: {
      main: paletteValues.tones.primary,
      contrastText: paletteValues.tones.onPrimary,
    },
    secondary: {
      main: paletteValues.tones.secondary,
      contrastText: paletteValues.surface.on,
    },
    surface: paletteValues.surface,
    tones: paletteValues.tones,
  },
})
