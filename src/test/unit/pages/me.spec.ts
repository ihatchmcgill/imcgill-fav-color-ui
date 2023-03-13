import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import VueMeta from 'vue-meta'
import Vuetify from 'vuetify'
import me from '~/pages/me.vue'

const stubs = ['nuxt-link']
const localVue = createLocalVue()
localVue.use(VueMeta, { keyName: 'head' })
localVue.use(Vuex)
Vue.use(Vuetify)
Vue.use(Vuex)

const vuetify = new Vuetify({})

describe('pages/me', () => {
  let state
  let store
  beforeEach(() => {
    state = {
      user: {
        byuId: '654623247'
      }
    }
    store = new Vuex.Store({
      state
    })
  })
  test('exists', () => {
    const wrapper = shallowMount(me, {
      localVue,
      vuetify,
      stubs,
      store
    })
    const vm: any = wrapper.vm

    expect(vm).toBeTruthy()
  })
})
