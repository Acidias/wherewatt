import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { theme } from '../core/theme'

type Props = React.ComponentProps<typeof PaperButton>

export default function Button({ style, mode = 'contained', ...props }: Props) {
  return (
    <PaperButton
    style={[
      styles.button,
      mode === 'outlined' && { backgroundColor: theme.colors.secondary },
      mode === 'contained' && { backgroundColor: theme.colors.primary },
      style,
    ]}
    labelStyle={[
      styles.text,
      mode === 'contained' && { color: theme.colors.onPrimary },
      mode === 'outlined' && { color: theme.colors.primary },
    ]}
    mode={mode}
    {...props}
  />
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
})