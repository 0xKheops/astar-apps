import { mount } from '@vue/test-utils';
// import store, { storeKey } from 'src/store';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { Option } from '@polkadot/types-codec';
import { defineComponent, ref, inject, InjectionKey } from 'vue';
import BN from 'bn.js';
import { EraInfo } from 'src/hooks/useTvl';

// Injection key
const ApiKey: InjectionKey<IApi> = Symbol('Api');

// ApiPromise wrapper
interface IApi {
  getTvl(): Promise<BN>;
}

// Not important for the component testing since implementaion has been mocked.
// Added here just as the portal implementation hint.
class Api implements IApi {
  private api: ApiPromise;

  constructor() {
    const provider = new WsProvider('wss://rpc.astar.network');
    this.api = new ApiPromise({ provider });
  }

  public async getTvl(): Promise<BN> {
    await this.connect();
    const eraInfo = await this.api.query.dappsStaking.generalEraInfo<Option<EraInfo>>(1);

    return eraInfo.unwrap().locked.toBn();
  }

  async connect(): Promise<void> {
    // Handle errors / reconnect here.
    await this.api.isReady;
  }
}

// Test component
const TvlComponent = defineComponent({
  setup() {
    const api = inject(ApiKey);
    const locked = ref<BN | undefined>();

    const getTvl = async (): Promise<void> => {
      locked.value = await api?.getTvl();
    };

    getTvl();

    return {
      locked,
    };
  },
  template: '{{ locked }}',
});

// TEST START

// Api mock
const apiMock: jest.Mocked<IApi> = {
  getTvl: jest.fn(),
};

// Test component wrapper
const createWrapper = () => {
  const wrapper = mount(TvlComponent, {
    global: {
      provide: {
        // [<symbol>storeKey]: store({}), // provide vuex
        [<symbol>ApiKey]: apiMock,
      },
      mocks: {
        $t: () => {}, // mock i18n, also we can do something like: $t: (msg: string, params: any) => `TVL: ${params.value}%`,
      },
    },
  });

  return wrapper;
};

describe('useTvl', () => {
  it('displays valid TVL', (done) => {
    apiMock.getTvl.mockImplementation(() => Promise.resolve(new BN(22)));
    const wrapper = createWrapper();

    wrapper.vm.$nextTick(() => {
      expect(wrapper.text()).toContain('22');
      done();
    });
  });
});
