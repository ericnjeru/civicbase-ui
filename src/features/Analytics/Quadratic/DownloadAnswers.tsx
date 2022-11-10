import { CSVLink } from 'react-csv'
import { BsDownload } from 'react-icons/bs'

import { PrimaryButton } from 'components/Button'
import Tooltip from 'components/Tooltip'
import { useAnalytics } from 'contexts/analytics'
import tw, { theme } from 'twin.macro'

const DownloadAnswers = () => {
  const { survey, csv, mode } = useAnalytics()

  if (!survey || !csv) {
    return null
  }

  return (
    <CSVLink
      data={csv[mode]}
      filename={`${survey.setup.topic}-${mode}.csv`}
      style={{ outline: 'none', textDecoration: 'none' }}
    >
      <Tooltip label="Download Answers in CSV format" popperProps={{ delayShow: 1000, placement: 'top' }}>
        <PrimaryButton css={tw`flex items-center`}>
          <BsDownload size={24} color={theme`colors.white`} css={tw`mr-2`} />
          Download
        </PrimaryButton>
      </Tooltip>
    </CSVLink>
  )
}

export default DownloadAnswers
