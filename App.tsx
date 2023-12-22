import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, Text, TouchableNativeFeedback, View } from 'react-native'
import Swiper from 'react-native-swiper'
import FlipCard from 'react-native-flip-card'
import schifffahrtsrecht from './assets/schifffahrtsrecht.json'
import Flashcard from './components/Flashcard'
import CardStatus from './components/CardStatus'
import { colors } from './lib/const'
import Chip from './components/Chip'

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.gray[1],
      }}
    >
      <StatusBar style="light" />
      <SafeAreaView style={{ flex: 1, overflow: 'visible' }}>
        <View style={{ flexDirection: 'row', overflow: 'scroll', padding: 12 }}>
          <Chip
            text="Alle"
            isActive
            borderColors={[
              colors.red,
              colors.orange,
              colors.yellow,
              colors.green,
              colors.blue,
            ]}
          />
          <Chip isActive text="Schifffahrtsrecht" />
          <Chip text="Kapitänspatent" />
          <Chip text="Kapitänspatent" />
          <Chip text="Kapitänspatent" />
          <Chip text="Kapitänspatent" />
        </View>
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
                    <TouchableNativeFeedback
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
                    </TouchableNativeFeedback>
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
