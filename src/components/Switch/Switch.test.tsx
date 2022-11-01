import { render } from '@testing-library/react'
import Switch from './Switch'

describe('Switch', () => {
  it('renders a styled Switch', async () => {
    const { container, debug } = render(
      <Switch value={true} onChange={() => {}}>
        Enable Notification{' '}
      </Switch>,
    )

    debug(container)

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="Switch___StyledDiv-sc-eh9tr0-0 jUWIb"
        >
          <button
            aria-checked="true"
            aria-labelledby="headlessui-label-2"
            class="Switch___StyledSwitchHeadless-sc-eh9tr0-1 kKuWhq"
            data-headlessui-state="checked"
            id="headlessui-switch-1"
            role="switch"
            tabindex="0"
            type="button"
          >
            <span
              class="Switch___StyledSpan-sc-eh9tr0-2 kXmGLe"
            >
              Enable Notification
               
            </span>
            <span
              class="Switch___StyledSpan2-sc-eh9tr0-3 HKGRA"
            />
          </button>
          <label
            class="Switch___StyledSwitchHeadlessLabel-sc-eh9tr0-4 hQCfSH"
            id="headlessui-label-2"
          >
            Enable Notification
             
          </label>
        </div>
      </div>
    `)
  })
})
