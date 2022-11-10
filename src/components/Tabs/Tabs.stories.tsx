import React from 'react'

import { Meta } from '@storybook/react'
import tw from 'twin.macro'

import TabItem from './TabItem'
import TabPanel from './TabPanel'
import Tabs from './Tabs'

export default {
  title: 'Elements/Tabs',
  component: Tabs,
} as Meta

export const Basic = () => (
  <div css={tw`w-full flex bg-gray-200 p-4 rounded`}>
    <Tabs initial="one">
      <div css={tw`w-40 mr-4`}>
        <TabItem id="one">one</TabItem>
        <TabItem id="two">two</TabItem>
        <TabItem id="three">three</TabItem>
        <TabItem id="four">four</TabItem>
        <TabItem id="five">five</TabItem>
        <TabItem id="six">six</TabItem>
      </div>
      <div css={tw`w-72 bg-white rounded-md p-4`}>
        <TabPanel value="one">one content</TabPanel>
        <TabPanel value="two">two content</TabPanel>
        <TabPanel value="three">three content</TabPanel>
        <TabPanel value="four">four content</TabPanel>
        <TabPanel value="five">five content</TabPanel>
        <TabPanel value="six">six content</TabPanel>
      </div>
    </Tabs>
  </div>
)
