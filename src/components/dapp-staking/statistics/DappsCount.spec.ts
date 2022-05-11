import { shallowMount } from '@vue/test-utils';
import { useStore } from 'vuex';
//import * as store from 'src/store';
import DappsCount from 'src/components/dapp-staking/statistics/DappsCount.vue';

const getComponentWrapper = () => {
  const storeMock = jest
    // .spyOn(store, 'useStore')
    // .mockImplementation(() => {
    //   console.log('mock called');
    //   return useStore('vuex-test');
    // });

  return shallowMount(DappsCount);
}

describe('DappsCount', () => {
  it('can create component', () => {
    const wrapper = getComponentWrapper();

    console.log('in test');
    expect(wrapper).not.toBeNull();
  });
});
