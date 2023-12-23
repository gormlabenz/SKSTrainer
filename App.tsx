import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import data from './lib/data'
import Flashcard from './components/Flashcard'
import CardStatus from './components/CardStatus'
import { colors } from './lib/const'
import Chip from './components/Chip'
import { useEffect, useState } from 'react'
import { CardType } from './lib/types'

export default function App() {
  const [allChips, setAllChips] = useState({
    text: 'Alle',
    isActive: true,
    borderColors: [colors.yellow, colors.green, colors.blue],
  })
  const [chips, setChips] = useState([
    { text: 'Schifffahrtsrecht', isActive: false },
    { text: 'Kapitänspatent', isActive: false },
    { text: 'Kapitänspatent', isActive: false },
    { text: 'Kapitänspatent', isActive: false },
    { text: 'Kapitänspatent', isActive: false },
  ])
  const [cards, setCards] = useState<CardType[]>([])

  const [runningAnimations, setRunningAnimations] = useState(0)

  const calculateTop = (index: number, arrayLength: number) => {
    if (index < 4) {
      return 24 * Math.exp(-index)
    }
    return 0
  }

  const calculateColor = (index: number, arrayLength: number) => {
    switch (index) {
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

  const removeCard = () => {
    setCards((prevCards) => prevCards.slice(0, prevCards.length - 1))
    setRunningAnimations(runningAnimations - 1 > 0 ? runningAnimations - 1 : 0)
  }

  useEffect(() => {
    console.log('runningAnimations', runningAnimations)
  }, [runningAnimations])

  useEffect(() => {
    setCards(data)
  }, [])

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
          <Chip
            text={allChips.text}
            isActive={allChips.isActive}
            borderColors={allChips.borderColors}
            onPress={() => {
              setAllChips({
                ...allChips,
                isActive: !allChips.isActive,
              })
              const newChips = chips.map((chip) => ({
                ...chip,
                isActive: !allChips.isActive,
              }))
              setChips(newChips)
            }}
          />
          {chips.map((chip, index) => (
            <Chip
              key={index}
              text={chip.text}
              isActive={chip.isActive}
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
          {cards.map((card, index) => (
            <Flashcard
              key={card.id}
              top={calculateTop(index + runningAnimations, cards.length)}
              backgroundColor={calculateColor(index, cards.length)}
              zIndex={cards.length - index}
              panEnabled={index + runningAnimations === cards.length - 1}
              afterReleaseLeft={removeCard}
              afterReleaseRight={removeCard}
              onRelease={() => {
                setRunningAnimations(1 + runningAnimations)
              }}
              afterRelease={() => {
                /* setRunningAnimations(runningAnimations - 1)
                console.log('afterRelease', runningAnimations) */
              }}
            >
              <CardStatus
                status="hidden"
                index={card.index}
                chapter={card.chapter}
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
                {card.question}
              </Text>
            </Flashcard>
          ))}
        </View>
      </SafeAreaView>
    </View>
  )
}
