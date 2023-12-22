import React, { FC, useEffect, useRef } from 'react'
import { Text, Animated, TouchableOpacity } from 'react-native'
import { colors } from '../lib/const'
import { LinearGradient } from 'expo-linear-gradient'
import * as Haptics from 'expo-haptics'

interface Props {
  text: string
  onPress: () => void
  isActive?: boolean
  borderColors?: string[]
}

const Chip: FC<Props> = ({ text, isActive, borderColors, onPress }: Props) => {
  // Erstellen Sie eine animierte Wertinstanz für die Hintergrundfarbe
  const backgroundColorAnim = useRef(new Animated.Value(0)).current

  // Interpolieren Sie die Hintergrundfarbe basierend auf dem animierten Wert
  const backgroundColorInterpolated = backgroundColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.gray[600], colors.gray[300]],
  })

  useEffect(() => {
    // Animieren der Hintergrundfarbe beim Ändern des isActive-Status
    Animated.timing(backgroundColorAnim, {
      toValue: isActive ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }, [isActive])

  const handlePress = () => {
    // Fügen Sie Haptics Feedback hinzu
    Haptics.selectionAsync()

    // Führen Sie die übergebene onPress Funktion aus
    onPress()
  }

  const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity)

  return (
    <LinearGradient
      colors={
        borderColors ? borderColors : [colors.gray[600], colors.gray[600]]
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        borderRadius: 24,
        marginRight: 8,
        flexShrink: 0,
      }}
    >
      <AnimatedTouchableOpacity
        activeOpacity={0.6}
        style={{
          margin: 1,
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 20,
          backgroundColor: backgroundColorInterpolated,
        }}
        onPress={handlePress}
      >
        <Text
          style={{
            color: colors.white,
            fontWeight: 'bold',
          }}
        >
          {text}
        </Text>
      </AnimatedTouchableOpacity>
    </LinearGradient>
  )
}

export default Chip
