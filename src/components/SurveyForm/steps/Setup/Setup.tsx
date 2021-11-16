import Input from 'components/Form/Input'
import Label from 'components/Form/Label'
import Dropdown from 'components/Dropdown'
import tw from 'twin.macro'

const Setup = () => {
  const methods = ['Quadratic', 'Linear']
  return (
    <div>
      <Label>Title</Label>
      <Input />

      <div css={tw`grid grid-cols-2 gap-8 my-4`}>
        <div>
          <Label>Preferred Function</Label>
          <Dropdown values={methods} />
        </div>

        <div>
          <Label>Total number of credits</Label>
          <Input />
        </div>
      </div>
    </div>
  )
}

export default Setup
