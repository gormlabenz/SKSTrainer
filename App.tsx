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

  const calculateTop = (index: number) => {
    if (index < 4) {
      return 28 * Math.exp(-index)
    }
    return 0
  }

  const calculateColor = (index: number) => {
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
        return colors.gray[600]
    }
  }

  const calculateScale = (index: number) => {
    if (index < 4) {
      return 1 - 0.08 * index
    }
    return 1 - 0.08 * 3
  }

  const removeCard = () => {
    const newCards = cards.slice(1)
    setCards(newCards)
  }

  useEffect(() => {
    setCards(data.slice(0, 10))
  }, [])

  useEffect(() => {
    if (chips.some((chip) => !chip.isActive)) {
      setAllChips({
        ...allChips,
        isActive: false,
      })
    } else if (chips.every((chip) => chip.isActive) && !allChips.isActive) {
      setAllChips({
        ...allChips,
        isActive: true,
      })
    }
  }, [chips])

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
              isActive={allChips.isActive ? true : chip.isActive}
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
              top={calculateTop(index)}
              backgroundColor={calculateColor(index)}
              scale={calculateScale(index)}
              zIndex={-index}
              panEnabled={index === 0}
              afterReleaseLeft={removeCard}
              afterReleaseRight={removeCard}
              onRelease={() => {}}
              afterRelease={() => {}}
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
