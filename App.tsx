import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import schifffahrtsrecht from './lib/data/schifffahrtsrecht'
import Flashcard from './components/Flashcard'
import CardStatus from './components/CardStatus'
import { colors } from './lib/const'
import Chip from './components/Chip'
import { useEffect, useState } from 'react'

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
  const [cards, setCards] = useState(
    schifffahrtsrecht.sort((a, b) => b.index - a.index)
  )

  const [indexController, setIndexController] = useState(0)

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

  const removeCard = () => {
    setCards((prevCards) => prevCards.slice(0, prevCards.length - 1))
  }

  useEffect(() => {
    console.log('indexController', indexController)
  }, [indexController])

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
              key={card.index}
              top={calculateTop(index + indexController, cards.length)}
              backgroundColor={calculateColor(
                index + indexController,
                cards.length
              )}
              afterReleaseLeft={removeCard}
              afterReleaseRight={removeCard}
              onRelease={() => setIndexController(indexController + 1)}
              afterRelease={() => setIndexController(indexController - 1)}
            >
              <CardStatus
                status="hidden"
                index={card.index}
                length={cards.length}
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
