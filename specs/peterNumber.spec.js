import { mount, createLocalVue } from '@vue/test-utils'
import PeterNumber from '@/PeterNumber.vue'
// import Vue from 'vue'
import ElementUI from 'element-ui' 

const localVue = createLocalVue()
localVue.use(ElementUI)

describe('Test Peter\'s number', () => {
  const wrapper = mount(PeterNumber, { localVue } )
  const inputNumber = wrapper.find('.el-input__inner')

  it('The input of the number exists', () => {
        expect(inputNumber.exists()).toBe(true)
  })

  const buttonSubmit = wrapper.find('.el-button--primary')
  it('When user writes nothing there is an error', async () => {
      await buttonSubmit.trigger('click')
      let error = wrapper.find('.el-form-item__error')
      expect(error.exists()).toBe(true)
    })

  it('When user writes a text in the input, an error stands out', async () => {
    await inputNumber.setValue('text example')
    await buttonSubmit.trigger('click')
    let error = wrapper.find('.el-form-item__error')
    expect(error.exists()).toBe(true)
  })

  it('When user writes a number acceptable there is no error', async () => {
    await inputNumber.setValue('1229999')
    await buttonSubmit.trigger('click')
    let error = wrapper.find('.el-form-item__error')
    expect(error.exists()).toBe(false)
  })

  it('When user writes  10^18 there is no error', async () => {
    await inputNumber.setValue('100000000000000000')
    await buttonSubmit.trigger('click')
    let error = wrapper.find('.el-form-item__error')
    expect(error.exists()).toBe(false)
  })

  it('When user writes a number bigger than 10^18 an error stands out', async () => {
    await inputNumber.setValue('10000000000000000000')
    await buttonSubmit.trigger('click')
    let error = wrapper.find('.el-form-item__error')
    expect(error.exists()).toBe(true)
  })

})

