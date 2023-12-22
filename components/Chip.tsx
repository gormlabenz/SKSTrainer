import { FC } from 'react'
import { Text, View } from 'react-native'
import { colors } from '../lib/const'
import { LinearGradient } from 'expo-linear-gradient'

interface Props {
  text: string
  isActive?: boolean
  borderColors?: string[]
}

const Chip: FC<Props> = ({ text, isActive, borderColors }: Props) => {
  return (
    <LinearGradient
      colors={borderColors ? borderColors : [colors.white, colors.white]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        borderRadius: 24,
        marginRight: 8,
        flexShrink: 0,
      }}
    >
      <View
        style={{
          margin: 1,
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 20,
          borderColor: colors.white,
          backgroundColor: isActive ? colors.gray[2] : colors.gray[1],
        }}
      >
        <Text
          style={{
            color: colors.white,
            fontWeight: 'bold',
          }}
        >
          {text}
        </Text>
      </View>
    </LinearGradient>
  )
}

export default Chip
