import tw from 'twin.macro'

export const base = [
  tw`text-center text-base leading-none font-medium font-brand py-3 px-5 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-default outline-none focus:outline-none focus:(ring-2 ring-brand) bg-transparent`,
]
export const primary = {
  DEFAULT: [tw`text-white bg-brand hover:opacity-90 focus:bg-brand`],
  danger: [tw`text-white bg-danger-500 hover:bg-danger-600 focus:bg-danger-600`],
}
export const secondary = {
  DEFAULT: [
    tw`text-white bg-brand2 hover:opacity-90 focus:bg-brand2  disabled:(hover:bg-brand2 focus:bg-brand2) focus:(ring-2 ring-brand2)`,
  ],
  danger: [
    tw`text-white bg-danger-500 hover:bg-danger-600 focus:bg-danger-600 disabled:(hover:bg-danger-500 focus:bg-danger-500)`,
  ],
}
export const tertiary = [
  tw`text-brand bg-gray-100 hover:bg-gray-200 focus:(bg-gray-200 ring-2 bg-gray-200) disabled:(hover:bg-gray-100 focus:bg-gray-100) `,
]
export const dangerTextButton = [tw`text-danger-500 hover:text-danger-600 focus:text-danger-600 p-0`]
export const primaryTextButton = [tw`font-brand text-primary hover:text-primary focus:text-primary cursor-pointer p-0`]
export const outlined = {
  DEFAULT: [
    tw`font-medium py-2 px-4 border-2 border-primary-500 text-primary`,
    tw`hover:(outline-none light:bg-gray-100 dark:bg-gray-800 )`,
    tw`focus:(outline-none ring-brand ring-inset ring-2)`,
  ],
  light: [tw`bg-transparent text-gray-400 border-gray-400`],
}

export const transparent = [
  tw`inline-flex h-10 justify-center items-center w-full`,
  tw`rounded-md border border-transparent px-4 py-2`,
  tw`text-sm font-medium text-primary bg-white hover:bg-gray-50`,
  tw`focus:(outline-none ring-brand ring)`,
]

export const icon = [
  tw`bg-transparent rounded-md p-2 inline-flex items-center justify-center text-gray-400`,
  tw`hover:(outline-none bg-transparent text-primary)`,
  tw`focus:(outline-none ring-brand ring-inset ring-2)`,
]
