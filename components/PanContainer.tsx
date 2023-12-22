import React, { useRef } from 'react'
import { Animated, PanResponder, View } from 'react-native'

const PanContainer = ({
  children,
  onMove,
  panArray,
}: {
  children: React.ReactNode
  onMove: (
    index: number,
    moveX: number,
    moveY: number,
    strength?: number
  ) => void
  panArray: Animated.ValueXY[]
}) => {
  const panResponder = panArray.map((_, index) =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        onMove(index, gestureState.dx, gestureState.dy)
      },
      onPanResponderRelease: () => {
        Animated.spring(panArray[index], {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: false,
        }).start()
      },
    })
  )

  return (
    <View style={{ flex: 1 }}>
      {React.Children.map(children, (child, index) => (
        <Animated.View
          key={index}
          {...panResponder[index].panHandlers}
          style={{
            transform: panArray[index].getTranslateTransform(),
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        >
          {child}
        </Animated.View>
      ))}
    </View>
  )
}

export default PanContainer
