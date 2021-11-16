import tw from 'twin.macro'
import { BiCog, BiMessageRoundedCheck, BiMessageRoundedDetail } from 'react-icons/bi'
import { IoLanguageOutline } from 'react-icons/io5'
import { BsListCheck } from 'react-icons/bs'
import { IoFlagSharp } from 'react-icons/io5'
import Tabs, { TabItem, TabPanel, TabLabel } from 'components/Tabs'
import * as Forms from './steps'

const SurveyForm = () => {
  return (
    <div css={tw`w-full flex p-4 rounded`}>
      <Tabs initial="setup">
        <div css={tw`w-72 mr-4`}>
          <TabItem id="setup">
            <BiCog size={20} css={tw`mr-2`} aria-hidden="true" />
            <TabLabel id="setup">Setup</TabLabel>
          </TabItem>

          <TabItem id="language-designation">
            <IoLanguageOutline size={20} css={tw`mr-2`} aria-hidden="true" />
            <TabLabel id="language-designation">Language Designation</TabLabel>
          </TabItem>

          <TabItem id="welcome-message">
            <BiMessageRoundedDetail size={20} css={tw`mr-2`} aria-hidden="true" />
            <TabLabel id="welcome-message">Welcome Message</TabLabel>
          </TabItem>

          <TabItem id="questions">
            <BsListCheck size={20} css={tw`mr-2`} aria-hidden="true" />
            <TabLabel id="questions">Questions</TabLabel>
          </TabItem>

          <TabItem id="completion-message">
            <BiMessageRoundedCheck size={20} css={tw`mr-2`} aria-hidden="true" />
            <TabLabel id="completion-message">Completion Message</TabLabel>
          </TabItem>

          <TabItem id="feature-flag">
            <IoFlagSharp size={20} css={tw`mr-2`} aria-hidden="true" />
            <TabLabel id="feature-flag">Features</TabLabel>
          </TabItem>
        </div>

        <div css={tw`w-full bg-white rounded-md p-4 pt-0`}>
          <TabPanel value="setup">
            <Forms.Setup />
          </TabPanel>

          <TabPanel value="language-designation">
            <Forms.DesignationLanguage />
          </TabPanel>

          <TabPanel value="welcome-message">
            <Forms.WelcomeMessage />
          </TabPanel>

          <TabPanel value="questions">
            <Forms.Questions />
          </TabPanel>

          <TabPanel value="completion-message">
            <Forms.CompletionMessage />
          </TabPanel>

          <TabPanel value="feature-flag">
            <Forms.Features />
          </TabPanel>
        </div>
      </Tabs>
    </div>
  )
}

export default SurveyForm
