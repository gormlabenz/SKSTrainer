import { FC, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { colors } from '../lib/const'

interface Props {
  index: number
  chapter: string
  status: 'hidden' | 'shown'
}

const CardStatus: FC<Props> = ({ index, chapter, status }: Props) => {
  const [dotColor, setDotColor] = useState(colors.green)

  useEffect(() => {
    switch (status) {
      case 'hidden':
        setDotColor(colors.gray[700])
        break
      case 'shown':
        setDotColor(colors.gray[100])
        break
    }
  }, [status])
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View
        style={{
          width: 12,
          height: 12,
          marginRight: 12,
          borderRadius: 999,
          backgroundColor: dotColor,
        }}
      />
      <Text
        style={{
          fontWeight: 'bold',
          opacity: 0.5,
          color: colors.white,
        }}
      >
        {index}.
      </Text>
      <Text
        style={{
          marginRight: 6,
          fontWeight: 'bold',
          opacity: 0.5,
          flex: 1,
          color: colors.white,
          textAlign: 'right',
        }}
      >
        {chapter}
      </Text>
    </View>
  )
}

export default CardStatus
