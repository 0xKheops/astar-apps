import axios from 'axios';
import { shallowMount } from '@vue/test-utils';
import TokenPriceChart from 'src/components/dashboard/TokenPriceChart.vue';

jest.spyOn(axios, 'get');

const createComponent = () => {
  const wrapper = shallowMount(TokenPriceChart, {
    props: {
      network: 'astar',
    },
  });

  return wrapper;
};

describe('TokenPriceChart.vue', () => {
  it('can create component instance', () => {
    const component = createComponent();
    expect(component).toBeTruthy();
  });

  it('calls API', () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const component = createComponent();

    // TODO check why api is called 2 times
    expect(axios.get).toHaveBeenCalledTimes(2);
  });
});
