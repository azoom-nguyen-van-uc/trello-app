<template>
  <div class="hello">
    <v-card :style="{ 'background-color': backgroundColor }">
      <v-card-title>{{ name }}</v-card-title>
      <v-card-subtitle>Created {{ timeCreated }}</v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "card-my-board",
  props: ["name", "timeCreated", "color"],
  data: function () {
    return {
      backgroundColor: this.color,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-card__subtitle {
  font-size: 10px;
}
</style>
