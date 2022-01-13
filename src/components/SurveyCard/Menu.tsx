import { Menu } from '@headlessui/react'
import { ReactNode, useEffect, useCallback } from 'react'
import copy from 'copy-to-clipboard'
import tw from 'twin.macro'
import { IoDuplicateOutline } from 'react-icons/io5'
import { FadeInOut } from 'components/Transition'
import { BiCopy } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'
import Typography from 'components/Typography'
import useAsync from 'hooks/use-async'
import { deleteSurvey, clone } from 'services/survey'
import { useSurveys, SurveyActionKind } from 'contexts/surveys'
import { useToast } from 'contexts/toast'

function SurveyCardMenu({
  children,
  onMenuClose,
  surveyId,
}: {
  children: ReactNode
  surveyId: string
  onMenuClose: () => void
}) {
  const { dispatch } = useSurveys()
  const { run, data } = useAsync()
  const { trigger } = useToast()

  const setLoading = useCallback(
    (isLoading: boolean) => dispatch({ type: SurveyActionKind.LOADING, payload: { id: surveyId, isLoading } }),
    [dispatch, surveyId],
  )

  const handleCopy = () => {
    copy(surveyId)
    onMenuClose()
    trigger('Copied to clipboard!')
  }

  const handleDelete = () => {
    setLoading(true)
    run(deleteSurvey(surveyId))
    onMenuClose()
  }

  const handleClone = () => {
    setLoading(true)
    run(clone(surveyId))
    onMenuClose()
  }

  // CLONE
  useEffect(() => {
    if (data && data.id) {
      dispatch({ type: SurveyActionKind.ADD, payload: data })
      setLoading(false)
    }
  }, [data, dispatch, setLoading])

  useEffect(() => {
    if (data && data.message === 'Deleted.') {
      dispatch({ type: SurveyActionKind.DELETE, payload: { id: surveyId } })
      setLoading(false)
    }
  }, [surveyId, data, dispatch, setLoading])

  return (
    <Menu as="div">
      <div css={tw`relative inline-block text-left bg-transparent z-10`}>
        <Menu.Button>{children}</Menu.Button>

        <FadeInOut>
          <Menu.Items
            css={tw`absolute -right-3 top-0 w-56 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 p-1 focus:outline-none`}
          >
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleCopy}
                  css={[
                    active ? tw`bg-blue-500 text-white` : tw`text-gray-900`,
                    tw`flex rounded-md items-center w-full px-2 py-2 text-sm`,
                  ]}
                >
                  <BiCopy size={20} css={tw`mr-2`} aria-hidden="true" />
                  <Typography css={[active && tw`text-white`]}>Copy ID</Typography>
                </button>
              )}
            </Menu.Item>

            {/* <CloneSurvey surveyId={surveyId} onClose={() => onMenuClose()} /> */}

            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleClone}
                  css={[
                    active ? tw`bg-blue-500 text-white` : tw`text-gray-900`,
                    tw`flex rounded-md items-center w-full px-2 py-2 text-sm`,
                  ]}
                >
                  <IoDuplicateOutline size={20} css={tw`mr-2`} aria-hidden="true" />
                  <Typography css={[active && tw`text-white`]}>Clone</Typography>
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleDelete}
                  css={[
                    active ? tw`bg-red-500 text-white` : tw`text-gray-900`,
                    tw`flex rounded-md items-center w-full px-2 py-2 text-sm`,
                  ]}
                >
                  <AiOutlineDelete size={20} css={tw`mr-2`} aria-hidden="true" />
                  <Typography css={[active && tw`text-white`]}>Delete</Typography>
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </FadeInOut>
      </div>
    </Menu>
  )
}

export default SurveyCardMenu
