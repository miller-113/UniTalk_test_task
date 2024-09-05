import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface TypographyVariants {
    tableHeader: React.CSSProperties
  }

  interface TypographyVariantsOptions {
    tableHeader?: React.CSSProperties
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    tableHeader: true
  }
}
