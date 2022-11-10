import { useState } from 'react'
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaImage,
} from 'react-icons/fa'

import Editor from '@draft-js-plugins/editor'
import createImagePlugin from '@draft-js-plugins/image'
import { IconButton } from 'components/Button'
import { EditorState, RichUtils, AtomicBlockUtils } from 'draft-js'
import 'draft-js/dist/Draft.css'
import tw, { css } from 'twin.macro'

import ImageInput from './imageInput'

const TextEditor = ({
  modified,
  error,
  value = EditorState.createEmpty(),
  onChange,
  readOnly,
  size = null,
  enableImage,
}: {
  modified?: boolean
  error?: boolean
  value?: EditorState
  onChange: (value: EditorState) => void
  readOnly?: boolean
  size?: number | null
  enableImage?: boolean
}) => {
  const [focus, setFocus] = useState(false)
  const [showURLInput, setShowURLInput] = useState(false)

  const imagePlugin = createImagePlugin()
  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)

    if (newState) {
      onChange(newState)
      return 'handled'
    }

    return 'not-handled'
  }

  const editorContainer = css`
    .DraftEditor-editorContainer {
      overflow: auto;
      height: ${size}px;
      ${tw`max-h-72`};
    }
  `
  const _toggleInlineStyle = (style: string) => {
    onChange(RichUtils.toggleInlineStyle(value, style))
  }

  const _toggleContentBlock = (style: string) => {
    onChange(RichUtils.toggleBlockType(value, style))
  }

  const insertImage = (url: string) => {
    const contentState = value.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity('image', 'IMMUTABLE', { src: url })
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(value, { currentContent: contentStateWithEntity })
    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ')
  }

  const handleImage = (url: string) => {
    setShowURLInput(false)
    const newEditorState = insertImage(url)
    onChange(newEditorState)
  }

  return (
    <div>
      {!readOnly && (
        <>
          <div css={tw`grid gap-2 grid-flow-col auto-cols-min mb-3`}>
            <IconButton onMouseDown={() => _toggleInlineStyle('BOLD')}>
              <FaBold size={22} />
            </IconButton>
            <IconButton onMouseDown={() => _toggleInlineStyle('ITALIC')}>
              <FaItalic size={22} />
            </IconButton>
            <IconButton onMouseDown={() => _toggleInlineStyle('UNDERLINE')}>
              <FaUnderline size={22} />
            </IconButton>
            <IconButton onMouseDown={() => _toggleContentBlock('unordered-list-item')}>
              <FaListUl size={22} />
            </IconButton>
            <IconButton onMouseDown={() => _toggleContentBlock('ordered-list-item')}>
              <FaListOl size={22} />
            </IconButton>
            <IconButton onMouseDown={() => _toggleInlineStyle('UNDERLINE')}>
              <FaAlignLeft size={22} />
            </IconButton>
            <IconButton onMouseDown={() => _toggleInlineStyle('UNDERLINE')}>
              <FaAlignCenter size={22} />
            </IconButton>
            <IconButton onMouseDown={() => _toggleInlineStyle('UNDERLINE')}>
              <FaAlignRight size={22} />
            </IconButton>
            {enableImage && (
              <IconButton onMouseDown={() => setShowURLInput(!showURLInput)}>
                <FaImage size={22} />
              </IconButton>
            )}
          </div>
          {showURLInput && enableImage && <ImageInput handleImage={handleImage} setShowURLInput={setShowURLInput} />}
        </>
      )}

      <div
        css={[
          tw`w-full outline-none`,
          !readOnly && tw`border-2 rounded-md border-gray-200 placeholder-gray-400 p-2 max-h-80`,
          focus && tw`outline-none ring-2 ring-blue-300 border-blue-300`,
          modified && tw`border-indigo-600 border-opacity-60`,
          error && tw`border-error-600 border-opacity-60`,
          error && focus && tw`ring-2 ring-red-300 border-red-300`,
          !readOnly && editorContainer,
        ]}
      >
        <Editor
          editorState={value}
          handleKeyCommand={handleKeyCommand}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          readOnly={readOnly}
          plugins={enableImage ? [imagePlugin] : undefined}
        />
      </div>
    </div>
  )
}

export default TextEditor
