import tw from 'twin.macro'
import HeaderSection from 'components/HeaderSection'
import * as Table from 'components/Table'
import * as Stats from 'components/Stats'
import Badge from 'components/Badge'
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai'

const Analytics = () => {
  return (
    <>
      <HeaderSection />

      <div css={tw`mt-24`}>
        <Stats.List>
          <Stats.Item title="Total Respondents" metric="82">
            <Badge style={{ height: 'min-content' }} css={tw`bg-green-200 flex items-center text-green-900`}>
              <AiOutlineArrowUp css={tw`mr-1 text-green-600`} />
              12%
            </Badge>
          </Stats.Item>
          <Stats.Item title="Total Access" metric="104">
            <Badge style={{ height: 'min-content' }} css={tw`bg-green-200 flex items-center text-green-900`}>
              <AiOutlineArrowUp css={tw`mr-1 text-green-600`} />
              25%
            </Badge>
          </Stats.Item>
          <Stats.Item title="Convertion Rate" metric="87%">
            <Badge style={{ height: 'min-content' }} css={tw`bg-red-200 flex items-center text-red-900`}>
              <AiOutlineArrowDown css={tw`mr-1 text-red-600`} />
              1.07%
            </Badge>
          </Stats.Item>
        </Stats.List>
      </div>

      <div css={tw`mt-24`}>
        <Table.Main>
          <Table.Head>
            <Table.Row>
              <Table.Header>Question Id</Table.Header>
              <Table.Header>Agree</Table.Header>
              <Table.Header>Disagree</Table.Header>
              <Table.Header>Total</Table.Header>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            <Table.Row>
              <Table.Data>QV1</Table.Data>
              <Table.Data>5</Table.Data>
              <Table.Data>5</Table.Data>
              <Table.Data>0</Table.Data>
            </Table.Row>

            <Table.Row>
              <Table.Data>QV2</Table.Data>
              <Table.Data>0</Table.Data>
              <Table.Data>3</Table.Data>
              <Table.Data>-3</Table.Data>
            </Table.Row>

            <Table.Row>
              <Table.Data>QV3</Table.Data>
              <Table.Data>0</Table.Data>
              <Table.Data>3</Table.Data>
              <Table.Data>-3</Table.Data>
            </Table.Row>
          </Table.Body>
        </Table.Main>
      </div>

      <div css={tw`mt-24`}>
        <Table.Main>
          <Table.Head>
            <Table.Row>
              <Table.Header></Table.Header>
              <Table.Header>User Id</Table.Header>
              <Table.Header>QV1</Table.Header>
              <Table.Header>QV2</Table.Header>
              <Table.Header>QV3</Table.Header>
              <Table.Header>Credits left</Table.Header>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            <Table.Row>
              <Table.Data>#1</Table.Data>
              <Table.Data>32374</Table.Data>
              <Table.Data>5</Table.Data>
              <Table.Data>0</Table.Data>
              <Table.Data>-3</Table.Data>
              <Table.Data>0</Table.Data>
            </Table.Row>

            <Table.Row>
              <Table.Data>#2</Table.Data>
              <Table.Data>35574</Table.Data>
              <Table.Data>5</Table.Data>
              <Table.Data>0</Table.Data>
              <Table.Data>-3</Table.Data>
              <Table.Data>0</Table.Data>
            </Table.Row>

            <Table.Row>
              <Table.Data>#3</Table.Data>
              <Table.Data>27674</Table.Data>
              <Table.Data>5</Table.Data>
              <Table.Data>0</Table.Data>
              <Table.Data>-3</Table.Data>
              <Table.Data>0</Table.Data>
            </Table.Row>
          </Table.Body>
        </Table.Main>
      </div>
    </>
  )
}

export default Analytics
