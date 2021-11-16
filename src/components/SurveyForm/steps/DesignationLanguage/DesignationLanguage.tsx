import tw from 'twin.macro'
import Label from 'components/Form/Label'
import Dropdown from 'components/Dropdown'

const DesignationLanguage = () => {
  const languages = ['Agree/Disagree', 'Favor/Opose', 'Aprove/Reject', 'Aye/Nay', 'Custom']
  const tokens = ['Credits', 'Coins', 'Tokens', 'Custom']

  return (
    <div>
      <div css={tw`grid grid-cols-2 gap-8`}>
        <div>
          <Label>Preferred Language</Label>
          <Dropdown values={languages} />
        </div>

        <div>
          <Label>Preferred Token</Label>
          <Dropdown values={tokens} />
        </div>
      </div>
    </div>
  )
}

export default DesignationLanguage
