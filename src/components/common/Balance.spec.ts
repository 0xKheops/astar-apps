import { shallowMount } from '@vue/test-utils';
import BN from 'bn.js';
import Balance from 'src/components/common/Balance.vue';

interface LocalStorage {
  defaultCurrency: string;
}

// Create a component wrapper and pass props
const createComponent = () => {
  const wrapper = shallowMount(Balance, {
    props: {
      balance: new BN('1100000000000000000'),
      decimals: 18,
      unit: 'ASTR', // Note: Not used by the component. The 'unit' value is read from local storage.
    },
  });

  return wrapper;
};

// Local storage mock object.
const localStorage: LocalStorage = {
  defaultCurrency: 'ASTR',
};

// Local storage read mock.
// key as keyof LocalStorage - key is one of LocalStorage props.
const getterMock = jest.fn((key) => localStorage[key as keyof LocalStorage]);

beforeAll(() => {
  global.Storage.prototype.getItem = getterMock;
});

afterAll(() => {
  // Return mock to original values.
  // Very important to avoid polluting future tests.
  getterMock.mockReset();
});

describe('Balance.vue', () => {
  it('can create component instance', () => {
    const component = createComponent();
    expect(component).toBeTruthy();
  });

  it('renders a valid content', () => {
    const component = createComponent();
    expect(component.text()).toMatch('1.1 ASTR');
  });
});
