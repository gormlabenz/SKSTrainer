import { FC, useEffect, useRef, useState } from 'react'
import { Animated, Text, View } from 'react-native'

interface Props {
  children: React.ReactNode
  backgroundColor: string
  top: number
}

const Flashcard: FC<Props> = ({ children, backgroundColor, top }: Props) => {
  // Animated Values
  const topAnimatedValue = useRef(new Animated.Value(top)).current
  const backgroundColorAnimatedValue = useRef(new Animated.Value(0)).current

  // Refs to track the previous values
  const prevTopRef = useRef(top)
  const prevBackgroundColorRef = useRef(backgroundColor)

  // Interpolations
  const topInterpolate = topAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [prevTopRef.current, top],
  })

  const backgroundColorInterpolate = backgroundColorAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [prevBackgroundColorRef.current, backgroundColor],
  })

  useEffect(() => {
    // Update the previous values
    prevTopRef.current = top
    prevBackgroundColorRef.current = backgroundColor

    // Animate top
    Animated.timing(topAnimatedValue, {
      toValue: 1, // We are interpolating to 1, so we animate to 1
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      // Reset the animated value to 0 after the animation is done
      topAnimatedValue.setValue(0)
    })

    // Animate backgroundColor
    Animated.timing(backgroundColorAnimatedValue, {
      toValue: 1, // We are interpolating to 1, so we animate to 1
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      // Reset the animated value to 0 after the animation is done
      backgroundColorAnimatedValue.setValue(0)
    })
  }, [top, backgroundColor, topAnimatedValue, backgroundColorAnimatedValue])

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
      <Animated.View
        style={{
          backgroundColor: backgroundColorInterpolate,
          flex: 1,
          borderRadius: 16,
          margin: 1,
          padding: 12,
          paddingTop: 24,
          paddingBottom: 12,
          height: '100%',
          paddingVertical: 24,
          top: topInterpolate,
        }}
      >
        {children}
      </Animated.View>
    </View>
  )
}

export default Flashcard
