import '@polkadot/api-augment';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import TVL from 'src/components/dapp-staking/statistics/TVL.vue';
import * as tvl from 'src/hooks/useTvl';
import store, { storeKey } from 'src/store';

const createWrapper = () => {
  const wrapper = mount(TVL, {
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

describe('TVL.vue', () => {
  it('creates component', () => {
    const wrapper = createWrapper();

    expect(wrapper).toBeTruthy();
  });

  it('displays TVL in tokens and USD', (done) => {
    // Mock useTvl
    const mock = jest.spyOn(tvl, 'useTvl').mockImplementation(() => {
      return {
        tvlToken: ref<BigInt>(BigInt('100')),
        tvlUsd: ref<number>(200),
      };
    });
    const wrapper = createWrapper();

    // component fetches data in async way so we need to handle expect in a way below.
    wrapper.vm.$nextTick(() => {
      expect(wrapper.text()).toContain('$200');
      mock.mockRestore();
      done();
    });
  });
});
