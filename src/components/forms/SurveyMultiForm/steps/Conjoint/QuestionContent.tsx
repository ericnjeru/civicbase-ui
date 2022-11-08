import { useFieldArray, useWatch } from 'react-hook-form'
import { AiOutlineClose } from 'react-icons/ai'

import AddButton from 'components/AddButton'
import { IconButton } from 'components/Button'
import Card from 'components/Card'
import EditText from 'components/EditText'
import tw from 'twin.macro'

import { ConjointAttributes } from '../../../../../../types/survey-base'

const QuestionContent = ({ questionIndex, isPublished }: { questionIndex: number; isPublished: boolean }) => {
  const conjoint = useWatch({ name: `conjoint.${questionIndex}` })

  const {
    fields: attributes,
    append: appendAttributes,
    remove: removeAttribute,
  } = useFieldArray({
    name: `conjoint.${questionIndex}.attributes`,
  })

  const {
    fields: items,
    append: appendItems,
    remove: removeItem,
  } = useFieldArray({
    name: `conjoint.${questionIndex}.items`,
  })

  return (
    <div css={tw`grid grid-cols-3 gap-4`}>
      <div>
        {attributes.map((attr, index) => (
          <div key={attr.id} css={tw`my-2 flex`}>
            <div css={tw`flex-1`}>
              <EditText
                name={`conjoint.${questionIndex}.attributes.${index}.name`}
                placeholder={`Attribute ${index + 1}`}
                disabled={isPublished}
              />
            </div>

            {!isPublished && (
              <IconButton onClick={() => removeAttribute(index)} css={tw`hover:bg-red-50`}>
                <AiOutlineClose />
              </IconButton>
            )}
          </div>
        ))}

        <AddButton
          css={tw`h-10 text-base`}
          onClick={() => appendAttributes({ name: '', key: `attribute${attributes.length}` })}
          disabled={isPublished}
        >
          + Add Attribute
        </AddButton>
      </div>
      <div css={tw`col-span-2`}>
        <div css={tw`grid grid-cols-2 gap-4`}>
          {items.map((item, itemIndex) => (
            <Card key={item.id}>
              <div css={tw`flex justify-end`}>
                {!isPublished && (
                  <IconButton onClick={() => removeItem(itemIndex)} css={tw`hover:bg-red-50`}>
                    <AiOutlineClose />
                  </IconButton>
                )}
              </div>
              {conjoint?.attributes.map((attr: ConjointAttributes, attrIndex: number) => (
                <div key={attr.id} css={tw`my-2`}>
                  <EditText
                    name={`conjoint.${questionIndex}.items.${itemIndex}.${conjoint.attributes[attrIndex].key}`}
                    placeholder={attr.name}
                    disabled={isPublished}
                  />
                </div>
              ))}
            </Card>
          ))}

          <AddButton css={tw`h-full`} onClick={() => appendItems({ id: Math.random() })} disabled={isPublished}>
            + Add Item
          </AddButton>
        </div>
      </div>
    </div>
  )
}

export default QuestionContent
