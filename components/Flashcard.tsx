import { FC, useEffect, useRef, useState } from 'react'
import { Animated, Text, View } from 'react-native'
import PanContainer from './PanContainer'

interface Props {
  children: React.ReactNode
  backgroundColor: string
  top: number
  afterReleaseLeft: () => void
  afterReleaseRight: () => void
  onRelease: () => void
  afterRelease: () => void
}

const Flashcard: FC<Props> = ({
  children,
  backgroundColor,
  top,
  afterReleaseLeft,
  afterReleaseRight,
  onRelease,
  afterRelease,
}: Props) => {
  return (
    <PanContainer
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
        <View
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
            top,
          }}
        >
          {children}
        </View>
      </View>
    </PanContainer>
  )
}

export default Flashcard
