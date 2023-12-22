import { FC } from 'react'
import { Text, View } from 'react-native'
import { colors } from '../lib/const'

interface Props {
  children: React.ReactNode
  backgroundColor?: string
}

const Flashcard: FC<Props> = ({ children, backgroundColor }: Props) => {
  return (
    <View
      style={{
        backgroundColor: backgroundColor ? backgroundColor : colors.gray[2],
        flex: 1,
        borderRadius: 16,
        margin: 1,
        padding: 12,
        marginHorizontal: 12,
        paddingTop: 24,
        paddingBottom: 12,
        height: '100%',
      }}
    >
      {children}
    </View>
  )
}

export default Flashcard
