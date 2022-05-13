import { mount } from '@vue/test-utils';
import { useTvl } from 'src/hooks/useTvl';
import store, { storeKey } from 'src/store';
import { $api } from 'src/boot/api';

const createWrapper = () => {
  const wrapper = mount(useTvl, {
    global: {
      provide: {
        [<symbol>storeKey]: store({}), // provide vuex
      },
      mocks: {
        $t: () => {}, // mock i18n, also we can do something like: $t: (msg: string, params: any) => `APR: ${params.value}%`,
      },
    },
  });

  return wrapper;
};

describe('useTvl', () => {
  it('calls method', () => {
    const mockedApi = $api as jest.Mocked<typeof $api>;
    const wrapper = createWrapper();

    const { tvlToken } = wrapper(mockedApi);
  });
});
