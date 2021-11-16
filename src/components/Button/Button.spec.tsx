import React from 'react'
import { render } from '@testing-library/react'
import PrimaryButton from './Primary'

describe('Button', () => {
  test('renders a styled button', async () => {
    const { container } = render(<PrimaryButton>Click Me</PrimaryButton>)

    expect(container).toMatchInlineSnapshot(`
      .c0 {
        text-align: center;
        font-size: 1rem;
        line-height: 1;
        font-weight: 500;
        font-family: DM Sans,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        padding-left: 1.25rem;
        padding-right: 1.25rem;
        border-radius: 0.375rem;
        cursor: pointer;
        outline: 2px solid transparent;
        outline-offset: 2px;
      }

      .c0:disabled {
        opacity: 0.5;
        cursor: default;
      }

      .c0:focus {
        outline: 2px solid transparent;
        outline-offset: 2px;
        --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
        --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
        box-shadow: var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000);
        --tw-ring-opacity: 1;
        --tw-ring-color: rgba(0,158,255,var(--tw-ring-opacity));
      }

      .c1 {
        --tw-text-opacity: 1;
        color: rgba(255,255,255,var(--tw-text-opacity));
        --tw-bg-opacity: 1;
        background-color: rgba(0,158,255,var(--tw-bg-opacity));
      }

      .c1:hover {
        --tw-bg-opacity: 1;
        background-color: rgba(2,132,199,var(--tw-bg-opacity));
      }

      .c1:focus {
        --tw-bg-opacity: 1;
        background-color: rgba(2,132,199,var(--tw-bg-opacity));
      }

      .c1:disabled:hover {
        --tw-bg-opacity: 1;
        background-color: rgba(0,158,255,var(--tw-bg-opacity));
      }

      .c1:disabled:focus {
        --tw-bg-opacity: 1;
        background-color: rgba(0,158,255,var(--tw-bg-opacity));
      }

      <div>
        <button
          class="c0 c1"
          type="button"
        >
          Click Me
        </button>
      </div>
    `)
  })
})
