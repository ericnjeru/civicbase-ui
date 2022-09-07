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
          class="Switch___StyledDiv-sc-4pg7dy-0 gsWQSs"
        >
          <button
            aria-checked="true"
            aria-labelledby="headlessui-label-2"
            class="Switch___StyledSwitchHeadless-sc-4pg7dy-1 edPtVB"
            data-headlessui-state="checked"
            id="headlessui-switch-1"
            role="switch"
            tabindex="0"
            type="button"
          >
            <span
              class="Switch___StyledSpan-sc-4pg7dy-2 gasxrF"
            >
              Enable Notification
               
            </span>
            <span
              class="Switch___StyledSpan2-sc-4pg7dy-3 dWXiOD"
            />
          </button>
          <label
            class="Switch___StyledSwitchHeadlessLabel-sc-4pg7dy-4 hqNEKA"
            id="headlessui-label-2"
          >
            Enable Notification
             
          </label>
        </div>
      </div>
    `)
  })
})
