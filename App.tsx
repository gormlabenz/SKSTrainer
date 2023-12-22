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
        <Swiper showsPagination={false}>
          {schifffahrtsrecht.map((data) => (
            <View
              key={1}
              style={{
                flex: 1,
                paddingVertical: 24,
              }}
            >
              <FlipCard perspective={3000} flipHorizontal flipVertical={false}>
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
                <Flashcard>
                  <CardStatus
                    index={data.index}
                    length={schifffahrtsrecht.length}
                    status="hidden"
                  />
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: 'bold',
                      marginTop: 28,
                      marginBottom: 6,
                      opacity: 0.5,
                      color: colors.white,
                    }}
                  >
                    {data.answer}
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        console.log('pressed')
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: colors.white,
                          padding: 12,
                          borderRadius: 6,
                          width: '100%',
                          alignItems: 'center',
                        }}
                      >
                        <Text style={{ fontWeight: 'bold' }}>Verbergen</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </Flashcard>
              </FlipCard>
            </View>
          ))}
        </Swiper>
      </SafeAreaView>
    </View>
  )
}
