import tw, { styled } from 'twin.macro'

const Card = styled.div(() => [
  tw`select-none`,
  tw`bg-white border border-gray-50 rounded-md p-5 h-full`,
  tw`shadow-card hover:(shadow-card-lg) transition-shadow duration-150`,
  tw`dark:bg-secondary`,
])

export default Card
