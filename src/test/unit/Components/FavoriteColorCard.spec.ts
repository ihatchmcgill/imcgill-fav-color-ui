import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import VueMeta from 'vue-meta'
import Vuetify from 'vuetify'
import FavoriteColorCard from '~/components/FavoriteColorCard.vue'

const stubs = ['nuxt-link']

const localVue = createLocalVue()
localVue.use(VueMeta, { keyName: 'head' })
Vue.use(Vuetify)

const vuetify = new Vuetify({})
const wrapper = shallowMount(FavoriteColorCard, {
  propsData: { name: 'Cosmo', favColorName: 'blue' },
  localVue,
  vuetify,
  stubs
})
const vm: any = wrapper.vm

describe('components/FavoriteColorCard', () => {
  test('exists', () => {
    expect(wrapper.vm).toBeTruthy()
  })
  test('has variables', () => {
    expect(vm.name).toBeTruthy()
    expect(vm.favColorName).toBeTruthy()
  })
  test('variables are correct', () => {
    expect(vm.name).toBe('Cosmo')
    expect(vm.favColorName).toBe('blue')
  })
  test('colorChanged emits', async () => {
    wrapper.vm.$emit('colorChangedName', 'pink')
    await wrapper.vm.$nextTick() // Wait until $emits have been handled
    expect(wrapper.emitted().colorChangedName).toBeTruthy()
  })
})
