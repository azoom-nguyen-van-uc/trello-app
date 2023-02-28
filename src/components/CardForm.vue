<template>
  <div class="card-form text-center">
    <v-card @click="dialog = true">
      <v-card-text> {{ cardName }} </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" width="500px" light>
      <v-card>
        <v-row>
          <v-col md="10">
            <h2>{{ titleForm }}</h2>
          </v-col>
          <v-col md="2">
            <v-icon icon="mdi-close"></v-icon>
          </v-col>
        </v-row>
        <v-card-text>
          <v-row>
            <v-text-field
              :label="labelInput"
              :rules="rules"
              hide-details="auto"
              v-model="title"
            ></v-text-field>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-if="action === 'editCard'"
            variant="text"
            color="error"
            @click="deleteCard"
          >
            Delete
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="success" variant="text" @click="create"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import LocalStorage from "../utils/LocalStorage";

export default {
  name: "comp-card-form",
  props: ["cardName", "titleForm", "labelInput", "action", "id", "idNewList"],
  data() {
    return {
      idBoard: this.$router.history.current.params.boardId,
      title: this.action === "editCard" ? this.cardName : "",
      dialog: false,
      rules: [(value) => !!value || "Stuff todo is required."],
    };
  },
  methods: {
    create() {
      switch (this.action) {
        case "addCard": {
          const idBoard = this.idBoard;
          const idNewList = this.id;
          const titleCard = this.title;

          const newListUpdate = JSON.parse(localStorage.getItem("newList"))
            .filter((el) => el.idBoard === idBoard)
            .map(function (el, index) {
              if (index === idNewList) {
                el.card.push(titleCard);
              }
              return el;
            });
          const getNewList = JSON.parse(localStorage.getItem("newList")).filter(
            (el) => el.idBoard !== idBoard
          );

          localStorage.setItem(
            "newList",
            JSON.stringify(getNewList.concat(newListUpdate))
          );
          this.$emit("createCard", { idNewList, titleCard });
          this.dialog = false;
          break;
        }

        case "editCard":
          {
            const idBoard = this.idBoard;
            const idCard = this.id;
            const idNewList = this.idNewList;
            const titleCard = this.title;

            const newListUpdate = JSON.parse(localStorage.getItem("newList"))
              .filter((newList) => newList.idBoard === idBoard)
              .map(function (cards, index) {
                if (index === idNewList) {
                  cards.card[idCard] = titleCard;
                }
                return cards;
              });
            const getNewList = JSON.parse(
              localStorage.getItem("newList")
            ).filter((el) => el.idBoard !== idBoard);

            localStorage.setItem(
              "newList",
              JSON.stringify(getNewList.concat(newListUpdate))
            );
            this.$emit("updateCard", { idCard, idNewList, titleCard });
            this.dialog = false;
          }
          break;

        default: {
          const newList = {
            idBoard: this.idBoard,
            title: this.title,
            card: [],
          };

          LocalStorage(this, "newList", newList, "createNewList");
          break;
        }
      }
    },

    deleteCard() {
      const idCard = this.id;

      const getNewList = JSON.parse(localStorage.getItem("newList")).map(
        function (el) {
          el.card.splice(idCard, 1);
          return el;
        }
      );

      localStorage.setItem("newList", JSON.stringify(getNewList));
      this.$emit("deleteCard", idCard);
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
h2 {
  padding: 20px;
}
.card-form {
  margin-bottom: 10px;
}
</style>
