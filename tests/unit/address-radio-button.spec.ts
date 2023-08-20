import { shallowMount } from '@vue/test-utils';
import AddressComponent from '@/components/auth/HeaderSecondStep.vue';

describe('AddressComponent.vue', () => {
  it('renders billing and shipping address titles', () => {
    const wrapper = shallowMount(AddressComponent);

    const h2Elements = wrapper.findAll('h2');

    const billingTitle = h2Elements[0].text();

    expect(billingTitle).toBe('Billing address');

    const shippingTitle = h2Elements[1].text();

    expect(shippingTitle).toBe('Shipping address');
  });
});
