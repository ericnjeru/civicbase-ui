import Card from 'components/Card'
import Typography, { Headline } from 'components/Typography'
import { useState } from 'react'
import tw, { theme } from 'twin.macro'
import { ConjointItems, Survey } from '../../../../types/survey'
import { AiFillCheckCircle } from 'react-icons/ai'

const Conjoint = ({ survey }: { survey: Survey }) => {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div>
      {survey.conjoint?.map((question, index) => (
        <div css={tw`grid grid-cols-5 gap-4`} key={question.statement}>
          <div css={tw`mt-20`}>
            {question.attributes.map((attr) => (
              <Typography css={tw`mb-6 text-right`} key={attr.key}>
                {attr.name}
              </Typography>
            ))}
          </div>

          <div css={tw`col-span-4`}>
            <Headline css={tw`mb-4`}>
              {index + 1}. {question.statement}
            </Headline>

            <div css={tw`grid grid-cols-3 gap-4`}>
              {question.items.map((item: ConjointItems, itemIndex: number) => (
                <Card
                  key="1"
                  css={[
                    tw`mt-4 hover:(ring-brand2 ring-inset ring-2 cursor-pointer) relative`,
                    selected === itemIndex && tw`ring-brand2 ring-inset ring-2 border-none`,
                  ]}
                  onClick={() => setSelected(itemIndex)}
                >
                  {selected === itemIndex && (
                    <AiFillCheckCircle
                      size={24}
                      color={theme`colors.brand2`}
                      css={[tw`absolute right-4 top-4 opacity-100`, tw`transition-all ease-in-out duration-1000`]}
                    />
                  )}

                  {Object.values(item).map((a, index: number) => (
                    <Typography key={item[`attibute${index}`]} css={tw`mb-6 text-center`}>
                      {item[`attribute${index}`]}
                    </Typography>
                  ))}
                </Card>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Conjoint
