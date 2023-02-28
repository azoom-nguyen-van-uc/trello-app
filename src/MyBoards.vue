<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col md="10">
          <h1>My boards</h1>
        </v-col>
        <v-col md="2"> <Dialog @createBoard="createBoard" /> </v-col>
      </v-row>
      <v-row v-if="boards">
        <v-col v-for="(item, index) in boards" :key="index" md="2">
          <router-link :to="`boards/${index}`">
            <Cards
              :name="item.title"
              :timeCreated="item.timeCreated"
              :color="item.color"
            />
          </router-link>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Cards from "./components/Card.vue";
import Dialog from "./components/Dialog.vue";

export default {
  name: "MyBoards",
  components: {
    Cards,
    Dialog,
  },
  data: function () {
    return {
      boards: [],
    };
  },
  methods: {
    getListBoard() {
      this.boards = JSON.parse(localStorage.getItem("listBoard"));
    },
    createBoard(boards) {
      this.boards.push(boards);
    },
  },
  created: function () {
    this.getListBoard();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app {
  font-family: Arial, Helvetica, sans-serif;
}
h1 {
  text-align: left;
}

.v-btn {
  font-size: 15px;
}

a {
  text-decoration: none;
}
</style>
