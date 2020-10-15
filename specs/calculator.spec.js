import { mount, createLocalVue } from '@vue/test-utils'
import Calculator from '@/Calculator.vue'
import ElementUI from 'element-ui' 

const localVue = createLocalVue()
localVue.use(ElementUI)

describe('Test Calculator', () => {
  const wrapper = mount(Calculator, { localVue } )
  test('is a Vue instance', () => {
    //   expect(wrapper.isVueInstance()).toBeTruthy()
  })
})