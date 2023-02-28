<template>
  <div class="text-center">
    <v-btn color="primary" @click="dialog = true"> Add boards </v-btn>

    <v-dialog v-model="dialog" width="500px" light>
      <v-card>
        <v-row>
          <v-col md="10">
            <h2>Add boards</h2>
          </v-col>
          <v-col md="2">
            <v-icon icon="mdi-close"></v-icon>
          </v-col>
        </v-row>
        <v-card-text>
          <v-row>
            <v-text-field
              label="Board title"
              :rules="rules"
              hide-details="auto"
              v-model="title"
              v-on:keyup="handleInput"
            ></v-text-field>
          </v-row>
          <v-row justify="space-around">
            <v-color-picker
              class="ma-2"
              v-model="color"
              dot-size="30"
            ></v-color-picker>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            block
            @click="createBoards"
            :disabled="disabled"
            >Submit</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import LocalStorage from "../utils/LocalStorage";

export default {
  name: "comp-dialog",
  data() {
    return {
      title: "",
      color: "",
      disabled: true,
      dialog: false,
      rules: [(value) => !!value || "Board title is required."],
    };
  },
  methods: {
    createBoards() {
      const boards = {
        title: this.title,
        color: this.color,
        timeCreated: new Date(),
      };

      LocalStorage(this, "listBoard", boards, "createBoard");
    },
    handleInput() {
      if (this.title !== "") {
        this.disabled = false;
      }
    },
  },
};
</script>

<style scoped>
h2 {
  padding: 20px;
}
</style>
