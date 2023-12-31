export type CardType = {
  id: string
  chapter:
    | 'Navigation'
    | 'Schifffahrtsrecht'
    | 'Seemannschaft I (Antriebsmaschine und unter Segel)'
    | 'Seemannschaft II (Antriebsmaschine)'
    | 'Wetterkunde'
  index: number
  label: string
  question: string
  answer: string
  hidden: boolean
}
