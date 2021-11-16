import * as Accordion from 'components/Accordion'
import Typography, { Title } from 'components/Typography'
import { useState } from 'react'
import tw from 'twin.macro'

const FAQs = () => {
  const [active, setActive] = useState<number>()

  return (
    <div css={tw`flex`}>
      <div css={tw`flex flex-col max-w-sm w-full mr-12`}>
        <Title>Frequently asked questions</Title>
        <div css={tw`text-center max-w-sm inline-block`}>
          {/* TODO: fix */}
          <Typography css={tw`text-gray-500 inline-block`}>
            Can not find the answer you are looking for? Reach out to our
          </Typography>{' '}
          <Typography css={tw`text-brand2 inline-block`}>customer support</Typography>{' '}
          <Typography css={tw`text-gray-500 inline-block`}>team.</Typography>
        </div>
      </div>

      <Accordion.Body active={active} handleClick={setActive}>
        <Accordion.Item title="How do you make holy water?">
          <Typography>
            I do not know but the flag is a big plus. is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a
            galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining
          </Typography>
        </Accordion.Item>

        <Accordion.Item title="How you call someone with no body and no nose?">
          <Typography>
            I do not know but the flag is a big plus. is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a
            galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining
          </Typography>
        </Accordion.Item>
      </Accordion.Body>
    </div>
  )
}

export default FAQs
