import React from 'react'
import { render } from '@testing-library/react'
import Input from './Input'

describe('Input', () => {
  test('renders a styled input', async () => {
    const { container } = render(<Input />)

    expect(container).toMatchInlineSnapshot(`
      .c0 {
        height: 2.5rem;
        width: 100%;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        font-size: 0.875rem;
        line-height: 1;
        border-radius: 0.375rem;
        border-width: 2px;
        --tw-border-opacity: 1;
        border-color: rgba(229,231,235,var(--tw-border-opacity));
      }

      .c0::-webkit-input-placeholder {
        --tw-placeholder-opacity: 1;
        color: rgba(156,163,175,var(--tw-placeholder-opacity));
      }

      .c0::-moz-placeholder {
        --tw-placeholder-opacity: 1;
        color: rgba(156,163,175,var(--tw-placeholder-opacity));
      }

      .c0:-ms-input-placeholder {
        --tw-placeholder-opacity: 1;
        color: rgba(156,163,175,var(--tw-placeholder-opacity));
      }

      .c0::placeholder {
        --tw-placeholder-opacity: 1;
        color: rgba(156,163,175,var(--tw-placeholder-opacity));
      }

      .c0:focus {
        --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
        --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
        box-shadow: var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 #0000);
        --tw-ring-opacity: 1;
        --tw-ring-color: rgba(0,158,255,var(--tw-ring-opacity));
        outline: 2px solid transparent;
        outline-offset: 2px;
      }

      <div>
        <input
          class="c0"
        />
      </div>
    `)
  })
})
