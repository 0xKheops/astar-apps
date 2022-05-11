// // Added to avoid issue https://polkadot.js.org/docs/api/FAQ/#since-upgrading-to-the-7x-series-typescript-augmentation-is-missing
// // import '@polkadot/api-augment';
// import { shallowMount } from '@vue/test-utils';
// import { QIcon } from 'quasar';
// import * as apr from 'src/hooks/useApr';
// import APR from 'src/components/dapp-staking/statistics/APR.vue';

// const getAprWrapper = () => {
//   // return shallowMount(APR, {
//   //   global: {
//   //     components: {
//   //       QIcon,
//   //     },
//   //     mocks: {
//   //       $t: (msg: string, params: any) => `APR: ${params.value}%`,
//   //     },
//   //   },
//   // });

//   return shallowMount(APR);
// };

// describe('APR', () => {
//   it('calls useApr', () => {
//     const mock = jest.spyOn(apr, 'useApr');
//     const wrapper = getAprWrapper();

//     console.log('in test');
//     expect(mock).toBeCalled();
//     mock.mockRestore();
//   });
// });
