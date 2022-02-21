import { useState } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import 'draft-js/dist/Draft.css'
import tw, { css } from 'twin.macro'
import { IconButton } from 'components/Button'
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaListUl,
  FaListOl,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
} from 'react-icons/fa'

const TextEditor = ({
  modified,
  error,
  value = EditorState.createEmpty(),
  onChange,
  readOnly,
  size = null,
}: {
  modified?: boolean
  error?: boolean
  value?: EditorState
  onChange: (value: EditorState) => void
  readOnly?: boolean
  size?: number | null
}) => {
  const [focus, setFocus] = useState(false)
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

  // const seletedStyle = editorState.getCurrentInlineStyle()

  return (
    <div>
      {!readOnly && (
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
        </div>
      )}

      <div
        css={[
          tw`w-full p-2 max-h-80 outline-none`,
          tw`border-2 rounded-md border-gray-200 placeholder-gray-400`,
          focus && tw`outline-none ring-2 ring-blue-300 border-blue-300`,
          modified && tw`border-indigo-600 border-opacity-60`,
          error && tw`border-error-600 border-opacity-60`,
          error && focus && tw`ring-2 ring-red-300 border-red-300`,
          editorContainer,
        ]}
      >
        <Editor
          editorState={value}
          handleKeyCommand={handleKeyCommand}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          readOnly={readOnly}
        />
      </div>
    </div>
  )
}

export default TextEditor
