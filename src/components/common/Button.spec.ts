// mount vs shallowMount: use mount if you want to test child components also otherwise use shallowMount

import { shallowMount } from '@vue/test-utils';
import Button from 'src/components/common/Button.vue';

describe('Button.vue', () => {
  it('renders default slot value', () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: 'Button Caption',
      },
    });

    expect(wrapper.html()).toContain('Button Caption');
  });

  it('emits an event when clicked', () => {
    // arange
    const wrapper = shallowMount(Button);

    // act - simulate button press
    wrapper.find('button').trigger('click');

    // assert
    expect(wrapper.emitted()).toHaveProperty('click');
  });
});
