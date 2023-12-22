import { FC, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { colors } from '../lib/const'

interface Props {
  index: number
  length: number
  status: 'hidden' | 'shown'
}

const CardStatus: FC<Props> = ({ index, length, status }: Props) => {
  const [dotColor, setDotColor] = useState(colors.green)

  useEffect(() => {
    switch (status) {
      case 'hidden':
        setDotColor(colors.gray[1])
        break
      case 'shown':
        setDotColor(colors.white)
        break
    }
  }, [status])
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text
        style={{
          marginRight: 6,
          fontWeight: 'bold',
          opacity: 0.5,
          flex: 1,
          color: colors.white,
        }}
      >
        Frage {index} / {length}
      </Text>
      <View
        style={{
          width: 12,
          height: 12,
          borderRadius: 999,
          backgroundColor: dotColor,
        }}
      />
    </View>
  )
}

export default CardStatus
