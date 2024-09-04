import {
  TypographyOptions,
  TypographyStyleOptions
} from '@mui/material/styles/createTypography'

interface AppTypography extends TypographyOptions {
  midTitle: TypographyStyleOptions
  button1: TypographyStyleOptions
  typography: TypographyStyleOptions
}

const appTypography: AppTypography = {
  fontFamily: ['Roboto', '-apple-system', 'Arial', 'sans-serif'].join(','),
  h1: {
    fontWeight: 300,
    fontSize: '96px',
    letterSpacing: '-1.5px',
    lineHeight: '112.03px',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  h2: {
    fontWeight: 300,
    fontSize: '60px',
    lineHeight: '72px',
    letterSpacing: '-0.5px',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  h3: {
    fontWeight: 400,
    fontSize: '48px',
    lineHeight: '56.02px',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  h4: {
    fontWeight: 400,
    fontSize: '34px',
    lineHeight: '41.99px',
    letterSpacing: '0.25px',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  h5: {
    fontWeight: 400,
    fontSize: '24px',
    lineHeight: '32.02px',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  h6: {
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '32px',
    letterSpacing: '0.15px',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  midTitle: {
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '24px'
  },
  subtitle1: {
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '28px',
    letterSpacing: '0.15px',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  subtitle2: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '21.98px',
    letterSpacing: '0.1px',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  body1: {
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.15px',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  typography: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '20.02px',
    letterSpacing: '0.17px',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  body2: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.0025em'
  },
  caption: {
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '19.92px',
    letterSpacing: '0.4px'
  },
  overline: {
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '31.92px',
    letterSpacing: '1px',
    textTransform: 'uppercase'
  },
  button: {
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.5px',
    textTransform: 'initial'
  },
  button1: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.5px',
    textTransform: 'initial'
  }
}

export default appTypography
