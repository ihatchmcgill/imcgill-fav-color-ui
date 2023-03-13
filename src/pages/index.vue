
<script>
import ColorPicker from 'vue-color-picker-wheel'
import FavoriteColorCard from '~/components/FavoriteColorCard.vue'

export default {
  components: {
    FavoriteColorCard, ColorPicker
  },
  data () {
    return {
      addDialog: false,
      newByuId: '',
      newStudentName: '',
      newFavColorName: '',
      newFavColorId: 'white',
      students: []
    }
  },
  mounted () {
    this.updateList()
  },
  methods: {
    async updateList () {
      this.students = []
      const response = await this.$axios.$get('/')
      const data = response.data
      // console.log(data)
      data.forEach(student => this.students.push({
        byuId: student.byuId,
        name: student.name,
        favColorName: student.favColorName,
        favColorId: student.favColorId
      }))
    },
    async addFavoriteColor () {
      const body = {
        name: this.newStudentName,
        favColorName: this.newFavColorName,
        favColorId: this.newFavColorId
      }
      const response = await this.$axios.$post(`/${this.newByuId}`, body)
      console.log(response)

      this.newStudentName = ''
      this.newByuId = ''
      this.newFavColorName = ''
      this.newFavColorId = 'white'
      this.addDialog = false

      await this.updateList()
    },
    async deleteStudent (student) {
      const response = await this.$axios.$delete(`/${student.byuId}`)
      console.log(response)
      await this.updateList()
    },
    async updateColor (newColor, newColorId, student) {
      const body = {
        newFavColorName: newColor,
        newFavColorId: newColorId
      }
      const response = await this.$axios.$put(`/${student.byuId}`, body)
      console.log(response)
      await this.updateList()
    }
  }
}
</script>

<template>
  <body>
    <v-container>
      <v-layout row justify-center align-center>
        <v-flex xs1>
          <v-dialog v-model="addDialog" max-width="400">
            <template #activator="{ attrs, on }">
              <v-btn color="blue" v-bind="attrs" v-on="on">
                Add New
              </v-btn>
            </template>
            <v-card>
              <v-card :color="newFavColorId">
                <v-container>
                  <v-layout row justify-center align-center>
                    <v-flex xs9>
                      <color-picker v-model="newFavColorId" />
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
              <v-text-field v-model="newStudentName" outlined placeholder="Please Enter Your Name" />
              <v-text-field v-model="newByuId" outlined placeholder="Please Enter Your BYU-ID" />
              <v-text-field v-model="newFavColorName" outlined placeholder="Please Enter Your Favorite Color Name" />
              <v-btn color="blue" @click="addFavoriteColor">
                Save
              </v-btn>
              <v-btn color="grey" @click="addDialog=false;newFavColorName='';newByuId='';newStudentName=''">
                Cancel
              </v-btn>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
      <v-layout row wrap justify-start>
        <v-flex v-for="student in students" :key="student.byuId" md2>
          <favorite-color-card
            :byu-id="student.byuId"
            :name="student.name"
            :fav-color-name="student.favColorName"
            :fav-color-id="student.favColorId"
            @colorChanged="(newColor, newColorId) => updateColor(newColor, newColorId, student)"
            @colorDeleted="deleteStudent(student)"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </body>
</template>
