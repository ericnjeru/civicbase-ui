import { Meta } from '@storybook/react'
import Typography from 'components/Typography'
import { useState } from 'react'
import Accordion from './Accordion'
import AccordionItem from './AccordionItem'

export default {
  title: 'Elements/Accordion',
  component: Accordion,
} as Meta

export const Basic = () => {
  const [active, setActive] = useState<number>()

  return (
    <div style={{ width: '800px' }}>
      <Accordion active={active} handleClick={setActive}>
        <AccordionItem title="How do you make holy water?">
          <Typography>
            I do not know but the flag is a big plus. is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a
            galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining
          </Typography>
        </AccordionItem>

        <AccordionItem title="How you call someone with no body and no nose?">
          <Typography>
            I do not know but the flag is a big plus. is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a
            galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining
          </Typography>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
