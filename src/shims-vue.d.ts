// Mocks all files ending in `.vue` showing them as plain Vue instances
declare module '*.vue' {
  // Updated to solve problems with Jest: "expression produces a union type that is too complex to represent"
  // when calling shallowMount in tests - according to https://github.com/vuejs/test-utils/issues/194
  import { DefineComponent } from 'vue';
  const component: DefineComponent;
  export default component;
}
