import { FC, useRef } from 'react'
import { Animated, PanResponder } from 'react-native'

interface Props {
  children: React.ReactNode
  afterReleaseLeft: () => void
  afterReleaseRight: () => void
  onRelease: () => void
  afterRelease: () => void
}

const PanContainer: FC<Props> = ({
  children,
  afterReleaseLeft,
  afterReleaseRight,
  onRelease,
  afterRelease,
}: Props) => {
  const pan = useRef(new Animated.ValueXY()).current

  const handleMove = (moveX: number, moveY: number, strength = 200) => {
    const distanceMoved = Math.sqrt(moveX ** 2 + moveY ** 2)
    const resistanceFactor = distanceMoved / strength + 1

    pan.x.setValue(moveX / resistanceFactor)
    pan.y.setValue(moveY / resistanceFactor)
  }
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      handleMove(gestureState.dx, gestureState.dy)
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 150) {
        onRelease()
        Animated.spring(pan, {
          toValue: { x: 500, y: 0 },
          friction: 5,
          useNativeDriver: false,
        }).start(() => {
          afterReleaseRight()
          afterRelease()
        })
      } else if (gestureState.dx < -150) {
        onRelease()
        Animated.spring(pan, {
          toValue: { x: -500, y: 0 },
          friction: 5,
          useNativeDriver: false,
        }).start(() => {
          afterReleaseLeft()
          afterRelease()
        })
      } else {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: false,
        }).start()
      }
    },
  })
  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={{
        transform: pan.getTranslateTransform(),
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </Animated.View>
  )
}

export default PanContainer
