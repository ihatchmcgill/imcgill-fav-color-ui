<script>
import FavoriteColorCard from "~/components/FavoriteColorCard.vue"

export default {
  components: {
    FavoriteColorCard
  },
  data() {
    return {
      name: '',
      byuId: '',
      favColorName: '',
      favColorId: ''
    }
  },
  async mounted(){
    this.byuId = this.$route.params.byuId
    console.log(this.byuId)
    const response = await this.$axios.$get(`/${this.byuId}`)
    this.favColorName = response.favColorName
    this.favColorId = response.favColorId
    this.name = response.name
  },
  methods: {
    async updateColor(newColorName, newColorId) {
      const body = {
        newFavColorName: newColorName,
        newFavColorId: newColorId
      }
      const response = await this.$axios.$put(`/${this.byuId}`, body)
      console.log(response)
    },
    async deleteStudent(){
      const response = await this.$axios.$delete(`/${this.byuId}`)
      console.log(response)
    },
  }
}
</script>


<template>
  <favorite-color-card :byu-id="byuId" :name="name" :fav-color-name="favColorName" :fav-color-id="favColorId"
                       @colorChanged="(newColorName, newColorId) => updateColor(newColorName, newColorId)"
                       @colorDeleted="deleteStudent" />
</template>
