import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import VueMeta from 'vue-meta'
import Vuetify from 'vuetify'
import me from '~/pages/me.vue'

const stubs = ['nuxt-link']

const localVue = createLocalVue()
localVue.use(VueMeta, { keyName: 'head' })
Vue.use(Vuetify)

const vuetify = new Vuetify({})
const wrapper = shallowMount(me, {
  localVue,
  vuetify,
  stubs
})
const vm: any = wrapper.vm

describe('pages/me', () => {
  test('exists', () => {
    expect(vm).toBeTruthy()
    //expect(vm.$meta().refresh().metaInfo.title).toEqual('Home')
  })

    test('correctValues',() => {
        expect(vm.name).toBe('Isaac')
        expect(vm.favColor).toBe('purple')
    })
})
