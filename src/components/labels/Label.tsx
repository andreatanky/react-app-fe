import type { CSSProperties, PropsWithChildren } from 'react'

import styles from './Label.module.css'

interface LabelProps {
  text: string
  backgroundColor?: string
  textColor?: string
  className?: string
  style?: CSSProperties
}

export const Label = ({
  text,
  backgroundColor,
  textColor,
  className,
  style,
}: PropsWithChildren<LabelProps>) => {
  const inlineStyles: CSSProperties = {
    ...style,
  }

  if (backgroundColor) {
    inlineStyles.backgroundColor = backgroundColor
  }

  if (textColor) {
    inlineStyles.color = textColor
  }

  return (
    <span
      className={[styles.label, className ?? ''].filter(Boolean).join(' ')}
      style={inlineStyles}
    >
      {text.toUpperCase()}
    </span>
  )
}

export default Label
