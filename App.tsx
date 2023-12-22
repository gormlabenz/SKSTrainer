import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import schifffahrtsrecht from './assets/schifffahrtsrecht.json'
import Flashcard from './components/Flashcard'
import CardStatus from './components/CardStatus'
import { colors } from './lib/const'
import Chip from './components/Chip'
import { useState } from 'react'

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
        return colors.gray[400]
      case 1:
        return colors.gray[350]
      case 2:
        return colors.gray[300]
      case 3:
        return colors.gray[250]
      default:
        return colors.gray[200]
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.gray[500],
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
          {schifffahrtsrecht.reverse().map((data, index) => (
            <Flashcard
              top={calculateTop(index, schifffahrtsrecht.length)}
              backgroundColor={calculateColor(index, schifffahrtsrecht.length)}
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
        </View>
      </SafeAreaView>
    </View>
  )
}
