import { StatusBar } from 'expo-status-bar'
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native'
import Swiper from 'react-native-swiper'
import FlipCard from 'react-native-flip-card'
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
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.gray[1],
      }}
    >
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1, overflow: 'visible' }}>
        <ScrollView
          horizontal
          style={{
            flexDirection: 'row',
            overflow: 'scroll',
            padding: 12,
            flexShrink: 1,
            flexGrow: 0,
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
        <View style={{ flex: 1 }}>
          {schifffahrtsrecht.reverse().map((data, index) => (
            <View
              key={index}
              style={{
                flex: 1,
                paddingVertical: 24,
                position: 'absolute',
                height: '100%',
                width: '100%',
                top: calculateTop(index, schifffahrtsrecht.length),
              }}
            >
              <Flashcard>
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
            </View>
          ))}
        </View>
      </SafeAreaView>
    </View>
  )
}
