import React, { FC, useRef } from 'react'
import { Text, View, Animated, PanResponder } from 'react-native'
import { colors } from '../lib/const'

interface Props {
  text: string
}

const Answer: FC<Props> = ({ text }: Props) => {
  const translateY = useRef(new Animated.Value(0)).current
  const measuredHeight = useRef(0)
  const isOpen = useRef(false)

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        translateY.setValue(
          isOpen.current
            ? 56 + gestureState.dy
            : measuredHeight.current - 48 + gestureState.dy
        )
      },
      onPanResponderRelease: (evt, gestureState) => {
        const threshold = 100
        if (gestureState.dy < threshold) {
          Animated.timing(translateY, {
            toValue: 56,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            isOpen.current = true
          })
        } else if (gestureState.dy > threshold) {
          Animated.timing(translateY, {
            toValue: measuredHeight.current - 48,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            isOpen.current = false
          })
        }
        Animated.spring(translateY, {
          toValue: isOpen.current ? 56 : measuredHeight.current - 48,
          useNativeDriver: true,
        }).start()
      },
    })
  ).current

  return (
    <View
      onLayout={(event) => {
        measuredHeight.current = event.nativeEvent.layout.height
        translateY.setValue(measuredHeight.current - 48)
      }}
      style={{
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        top: 0,
        zIndex: 1,
      }}
    >
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          height: '100%',
          padding: 12,
          backgroundColor: colors.gray[500],
          transform: [{ translateY }],
        }}
      >
        <Text
          style={{
            color: colors.gray[200],
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 24,
          }}
        >
          Answer
        </Text>
        <Text
          style={{
            color: colors.white,
            fontSize: 28,
            fontWeight: 'bold',
          }}
        >
          {text}
        </Text>
      </Animated.View>
    </View>
  )
}

export default Answer
