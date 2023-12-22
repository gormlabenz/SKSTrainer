import { FC } from 'react'
import { Text, View } from 'react-native'
import { colors } from '../lib/const'

interface Props {
  children: React.ReactNode
  backgroundColor?: string
  top: number
}

const Flashcard: FC<Props> = ({ children, backgroundColor, top }: Props) => {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 12,
        position: 'absolute',
        height: '100%',
        width: '100%',
      }}
    >
      <View
        style={{
          backgroundColor: backgroundColor ? backgroundColor : colors.gray[400],
          flex: 1,
          borderRadius: 16,
          margin: 1,
          padding: 12,
          paddingTop: 24,
          paddingBottom: 12,
          height: '100%',
          paddingVertical: 24,
          top,
        }}
      >
        {children}
      </View>
    </View>
  )
}

export default Flashcard
