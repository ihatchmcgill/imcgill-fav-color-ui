<script lang="ts">
import ColorPicker from 'vue-color-picker-wheel'

// const props = defineProps({
//   byuId: {type: String, required: false},
//   name: {type: String, required: false},
//   favColorName: {type: String, required: false},
//   favColorId: {type: String, required: false},
// })
export default {
  components: {
    ColorPicker
  },
  props: ['byuId', 'name', 'favColorName', 'favColorId'],
  emits: ['colorChanged', 'colorDeleted'],
  data () {
    return {
      editColorDialog: false,
      deleteCardDialog: false,
      newColor: '',
      newColorId: 'white'
    }
  }
}
</script>

<template>
  <body>
    <v-card :color="favColorId">
      <v-container>
        <v-layout row justify-start>
          <v-flex>
            <v-card-title>
              {{ name }} ({{ byuId }})
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-layout row justify-start>
          <v-flex />
        </v-layout>
        <v-layout row justify-start>
          <v-flex>
            <v-card-title>
              Color: {{ favColorName }}
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-layout row justify-center>
          <v-dialog v-model="editColorDialog" max-width="400">
            <template #activator="{ attrs, on }">
              <v-btn color="blue" v-bind="attrs" v-on="on">
                Edit
              </v-btn>
            </template>
            <v-card :color="newColorId">
              <v-container>
                <v-layout row justify-center align-center>
                  <v-flex xs9>
                    <color-picker v-model="newColorId" />
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
            <v-card>
              <v-text-field v-model="newColor" outlined placeholder="Favorite Color Name" />
              <v-btn color="blue" @click="editColorDialog = false; $emit('colorChanged', newColor, newColorId);">
                Save
              </v-btn>
            </v-card>
          </v-dialog>
          <v-dialog v-model="deleteCardDialog" max-width="400">
            <template #activator="{ attrs, on }">
              <v-btn flat color="red" v-bind="attrs" v-on="on">
                Delete
              </v-btn>
            </template>
            <v-card>
              <v-card-title style="word-break: break-word">
                Are you sure you want to delete the entry for {{ name }}?
              </v-card-title>
              <v-btn color="green" @click="deleteCardDialog = false; $emit('colorDeleted')">
                Confirm
              </v-btn>
              <v-btn color="grey" @click="deleteCardDialog = false">
                Cancel
              </v-btn>
            </v-card>
          </v-dialog>
        </v-layout>
      </v-container>
    </v-card>
  </body>
</template>
