import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import Swiper from 'react-native-swiper'

export default function App() {
  const data = {
    index: 3,
    question:
      'Wer darf laut Verordnung zu den KVR ein Fahrzeug nicht führen oder als Mitglied der Crew eine andere Tätigkeit des Brücken- oder Decksdienstes nicht ausüben (allgemein ohne Zahlen zu beantworten)?',
    answer:
      'Wer infolge körperlicher oder geistiger Mängel oder des Genusses alkoholischer Getränke oder anderer berauschender Mittel in der sicheren Führung eines Fahrzeugs oder in der sicheren Ausübung einer anderen Tätigkeit des Brücken- oder Decksdienstes behindert ist.',
  }
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <Swiper
          activeDotColor="white"
          paginationStyle={{
            bottom: -12,
          }}
        >
          <View
            key={1}
            style={{
              backgroundColor: 'oldlace',
              flex: 1,
              borderRadius: 12,
              padding: 12,
              marginHorizontal: 12,
              marginBottom: 12,
              paddingTop: 24,
              paddingBottom: 12,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  marginRight: 6,
                  fontWeight: 'bold',
                  opacity: 0.5,
                  flex: 1,
                }}
              >
                Frage {data.index}
              </Text>
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  backgroundColor: 'green',
                }}
              />
            </View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                marginTop: 12,
                marginBottom: 6,
              }}
            >
              {data.question}
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                marginTop: 12,
                marginBottom: 6,
                opacity: 0.5,
              }}
            >
              {data.answer}
            </Text>
          </View>
          <View
            key={2}
            style={{
              backgroundColor: 'oldlace',
              flex: 1,
              borderRadius: 12,
              padding: 12,
              marginHorizontal: 12,
              marginBottom: 12,
              paddingTop: 24,
              paddingBottom: 12,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text
                style={{
                  marginRight: 6,
                  fontWeight: 'bold',
                  opacity: 0.5,
                  flex: 1,
                }}
              >
                Frage {data.index}
              </Text>
              <View
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 999,
                  backgroundColor: 'green',
                }}
              />
            </View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                marginTop: 12,
                marginBottom: 6,
              }}
            >
              {data.question}
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                marginTop: 12,
                marginBottom: 6,
                opacity: 0.5,
              }}
            >
              {data.answer}
            </Text>
          </View>
        </Swiper>
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'dimgray',
  },
})
