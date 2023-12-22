import { FC } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../lib/const'
import { LinearGradient } from 'expo-linear-gradient'

interface Props {
  text: string
  onPress: () => void
  isActive?: boolean
  borderColors?: string[]
}

const Chip: FC<Props> = ({ text, isActive, borderColors, onPress }: Props) => {
  return (
    <LinearGradient
      colors={borderColors ? borderColors : [colors.white, colors.white]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        borderRadius: 24,
        marginRight: 8,
        flexShrink: 0,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          margin: 1,
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 20,
          borderColor: colors.white,
          backgroundColor: isActive ? colors.gray[2] : colors.gray[1],
        }}
        onPress={onPress}
      >
        <Text
          style={{
            color: colors.white,
            fontWeight: 'bold',
          }}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  )
}

export default Chip
