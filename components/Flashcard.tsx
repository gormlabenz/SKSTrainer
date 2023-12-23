import React, { FC, useEffect, useRef } from 'react'
import { Animated, View } from 'react-native'
import PanContainer from './PanContainer'

interface Props {
  children: React.ReactNode
  backgroundColor: string
  top: number
  panEnabled: boolean
  zIndex: number
  scale: number
  afterReleaseLeft: () => void
  afterReleaseRight: () => void
  onRelease: () => void
  afterRelease: () => void
}

const Flashcard: FC<Props> = ({
  children,
  backgroundColor,
  top,
  panEnabled,
  zIndex,
  scale,
  afterReleaseLeft,
  afterReleaseRight,
  onRelease,
  afterRelease,
}: Props) => {
  const animatedTop = useRef(new Animated.Value(top)).current
  const animatedScale = useRef(new Animated.Value(scale)).current
  const adjust = 700
  useEffect(() => {
    Animated.spring(animatedTop, {
      toValue: top + (scale * adjust) / 2 - adjust / 2,
      useNativeDriver: false,
    }).start()
    Animated.spring(animatedScale, {
      toValue: scale,
      useNativeDriver: false,
    }).start()
  }, [top, scale])

  return (
    <PanContainer
      zIndex={zIndex}
      panEnabled={panEnabled}
      afterReleaseLeft={afterReleaseLeft}
      afterReleaseRight={afterReleaseRight}
      onRelease={onRelease}
      afterRelease={afterRelease}
    >
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
            backgroundColor,
            flex: 1,
            borderRadius: 16,
            margin: 1,
            padding: 12,
            paddingTop: 24,
            paddingBottom: 12,
            height: '100%',
            paddingVertical: 24,
            top: animatedTop,
            transform: [{ scale: animatedScale }],
          }}
        >
          {children}
        </Animated.View>
      </View>
    </PanContainer>
  )
}

export default Flashcard
