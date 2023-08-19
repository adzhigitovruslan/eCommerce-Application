import { shallowMount } from '@vue/test-utils';
import BaseButton from '@/components/ui/auth/BaseButton.vue';

describe('YourComponent.vue', () => {
  it('renders the close button when close prop is true', () => {
    const wrapper = shallowMount(BaseButton, {
      props: {
        close: true,
      },
    });

    const closeButton = wrapper.find('.button__close');
    const nextButton = wrapper.find('.button__next');

    expect(closeButton.exists()).toBe(true);
    expect(nextButton.exists()).toBe(false);

    // Test the presence of other elements inside the close button
    expect(closeButton.find('.button-icon').exists()).toBe(true);
    expect(closeButton.find('.button-icon font-awesome-icon').exists()).toBe(true);
  });

  it('renders the next button when close prop is false', () => {
    const wrapper = shallowMount(BaseButton, {
      props: {
        close: false,
      },
    });

    const closeButton = wrapper.find('.button__close');
    const nextButton = wrapper.find('.button__next');

    expect(closeButton.exists()).toBe(false);
    expect(nextButton.exists()).toBe(true);

    // Test the presence of other elements inside the next button
    expect(nextButton.find('span').exists()).toBe(true);
  });
});
