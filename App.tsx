import { StatusBar } from 'expo-status-bar'
import {
  Animated,
  PanResponder,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native'
import schifffahrtsrecht from './assets/schifffahrtsrecht.json'
import Flashcard from './components/Flashcard'
import CardStatus from './components/CardStatus'
import { colors } from './lib/const'
import Chip from './components/Chip'
import { useRef, useState } from 'react'
import PanContainer from './components/PanContainer'

export default function App() {
  const [chips, setChips] = useState([
    {
      text: 'Alle',
      isActive: true,
      borderColors: [colors.yellow, colors.green, colors.blue],
    },
    { text: 'Schifffahrtsrecht', isActive: false },
    { text: 'Kapitänspatent', isActive: false },
    { text: 'Kapitänspatent', isActive: false },
    { text: 'Kapitänspatent', isActive: false },
    { text: 'Kapitänspatent', isActive: false },
  ])

  const schifffahrtsrechtRef = useRef(schifffahrtsrecht.reverse())

  const pan = useRef(
    schifffahrtsrecht.map(() => new Animated.ValueXY())
  ).current

  const panResponder = schifffahrtsrecht.map((_, index) =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        handleMove(index, gestureState.dx, gestureState.dy)
      },
      onPanResponderRelease: () => {
        Animated.spring(pan[index], {
          toValue: { x: 0, y: 0 },
          friction: 5,
          useNativeDriver: false,
        }).start()
      },
    })
  )

  const handleMove = (
    index: number,
    moveX: number,
    moveY: number,
    strength = 200
  ) => {
    const distanceMoved = Math.sqrt(moveX ** 2 + moveY ** 2)
    const resistanceFactor = distanceMoved / strength + 1

    pan[index].x.setValue(moveX / resistanceFactor)
    pan[index].y.setValue(moveY / resistanceFactor)
  }

  const calculateTop = (index: number, arrayLength: number) => {
    const reversedIndex = arrayLength - 1 - index
    if (reversedIndex < 4) {
      return 24 * Math.exp(-reversedIndex)
    }
    return 0
  }

  const calculateColor = (index: number, arrayLength: number) => {
    const reversedIndex = arrayLength - 1 - index
    switch (reversedIndex) {
      case 0:
        return colors.gray[600]
      case 1:
        return colors.gray[550]
      case 2:
        return colors.gray[500]
      case 3:
        return colors.gray[450]
      default:
        return colors.gray[400]
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.gray[700],
      }}
    >
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1, overflow: 'visible' }}>
        <ScrollView
          horizontal
          style={{
            flexDirection: 'row',
            overflow: 'scroll',
            paddingHorizontal: 12,
            flexShrink: 1,
            flexGrow: 0,
            marginTop: 12,
          }}
          showsHorizontalScrollIndicator={false}
        >
          {chips.map((chip, index) => (
            <Chip
              key={index}
              text={chip.text}
              isActive={chip.isActive}
              borderColors={chip.borderColors}
              onPress={() => {
                const newChips = chips.map((chip) => ({
                  ...chip,
                }))
                newChips[index].isActive = !newChips[index].isActive
                setChips(newChips)
              }}
            />
          ))}
        </ScrollView>
        <View style={{ flex: 1, marginTop: 24, marginBottom: 24 }}>
          <PanContainer onMove={handleMove} panArray={pan}>
            {schifffahrtsrechtRef.current.map((data, index) => (
              <Flashcard
                top={calculateTop(index, schifffahrtsrecht.length)}
                backgroundColor={calculateColor(
                  index,
                  schifffahrtsrecht.length
                )}
              >
                <CardStatus
                  status="hidden"
                  index={data.index}
                  length={schifffahrtsrecht.length}
                />
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: 'bold',
                    marginTop: 28,
                    marginBottom: 6,
                    color: colors.white,
                  }}
                >
                  {data.question}
                </Text>
              </Flashcard>
            ))}
          </PanContainer>
        </View>
      </SafeAreaView>
    </View>
  )
}
