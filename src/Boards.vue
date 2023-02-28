<template>
  <v-container :style="{ 'background-color': backgroundColor }" fluid>
    <v-row>
      <v-col md="10">
        <h1>{{ boards.title }}</h1>
      </v-col>
      <v-col md="2"
        ><v-btn @click="deleteBoard" variant="tonal"> Delete </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="12">{{ boards.timeCreated }}</v-col>
    </v-row>
    <v-row>
      <v-col md="10">
        <div class="board-row">
          <div v-for="(item, index) in newList" :key="index" class="board">
            <v-row>
              <v-col md="7">
                <h2>{{ item.title }}</h2>
              </v-col>
              <v-col md="5">
                <v-btn @click="deleteList(index)" variant="tonal">
                  Delete
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="12">
                <comp-card-form
                  v-for="(itemCard, indexCard) in item.card"
                  :key="indexCard"
                  :cardName="itemCard"
                  :titleForm="itemCard"
                  :labelInput="`Edit title`"
                  :action="`editCard`"
                  :id="indexCard"
                  :idNewList="index"
                  @updateCard="updateCard"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col md="12">
                <comp-card-form
                  :cardName="`ADD CARD`"
                  :titleForm="`Card name`"
                  :labelInput="`Stuff to do`"
                  :action="`addCard`"
                  :id="index"
                  @createCard="createCard"
                  @deleteCard="deleteCard"
                />
              </v-col>
            </v-row>
          </div>
          <div class="board-create">
            <v-row>
              <v-col md="12">
                <comp-card-form
                  :cardName="`CREATE NEW LIST`"
                  :titleForm="`List name`"
                  :labelInput="`Stuff to do`"
                  :action="`addBoard`"
                  @createNewList="createNewList"
                />
              </v-col>
            </v-row>
          </div>
        </div>
      </v-col>
      <v-col md="2"></v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiDelete } from "@mdi/js";
import CardForm from "./components/CardForm.vue";

export default {
  name: "boards-card",
  components: {
    "comp-card-form": CardForm,
  },
  data: function () {
    return {
      backgroundColor: "",
      boards: {},
      newList: [],
      icons: {
        mdiDelete,
      },
    };
  },
  methods: {
    getBoard() {
      this.boards = JSON.parse(localStorage.getItem("listBoard"))[
        this.$router.history.current.params.boardId
      ];
      this.backgroundColor = this.boards.color;
    },

    deleteBoard() {
      const idBoard = this.$router.history.current.params.boardId;

      const boards = JSON.parse(localStorage.getItem("listBoard"))?.filter(
        (boards, index) => {
          return index !== Number(idBoard) && boards;
        }
      );
      const newList = JSON.parse(localStorage.getItem("newList"))
        ?.filter(
          (newList) =>
            newList.idBoard !== this.$router.history.current.params.boardId &&
            newList
        )
        .map((newList) => {
          if (newList.idBoard > idBoard) {
            newList.idBoard = String(Number(newList.idBoard) - 1);
          }
          return newList;
        });

      localStorage.setItem("newList", JSON.stringify(newList));
      localStorage.setItem("listBoard", JSON.stringify(boards));
      this.$router.push({ path: "/" });
    },

    getNewList() {
      const newList = localStorage.getItem("newList");
      if (newList !== "undefined") {
        this.newList = JSON.parse(newList).filter(
          (newList) =>
            newList.idBoard === this.$router.history.current.params.boardId &&
            newList
        );
      }
    },

    createNewList(newList) {
      this.newList.push(newList);
    },

    deleteList(idList) {
      const idBoard = this.$router.history.current.params.boardId;

      const newListwithBoard = JSON.parse(
        localStorage.getItem("newList")
      )?.filter((list) => list.idBoard === idBoard && list);
      const newList = JSON.parse(localStorage.getItem("newList"))?.filter(
        (list) => list.idBoard !== idBoard && list
      );
      this.newList = newListwithBoard.filter(
        (list, index) => index !== idList && list
      );

      localStorage.setItem(
        "newList",
        JSON.stringify(newList.concat(this.newList))
      );
    },

    createCard(cards) {
      this.newList.map(function (el, index) {
        if (index == cards.idNewList) {
          el.card.push(cards.titleCard);
          return el;
        }
      });
    },

    updateCard(cards) {
      this.newList = this.newList.map(function (cardsUpdate, index) {
        if (index === cards.idNewList) {
          cardsUpdate.card[cards.idCard] = cards.titleCard;
        }
        return cardsUpdate;
      });
    },

    deleteCard(idCard) {
      this.newList = this.newList.map(function (cards) {
        cards.card.splice(idCard, 1);
        return cards;
      });
    },
  },

  created: function () {
    this.getBoard();
    this.getNewList();
  },
};
</script>

<style scoped lang="scss">
.board-row {
  display: flex;
  flex-direction: row;
  padding-right: 24px;
  padding-top: 12px;
  min-height: 590px;

  > .board {
    padding: 20px;
    width: 300px;
    background-color: rgba(255, 254, 254, 0.5);
    border-radius: 15px;
    margin-right: 20px;
  }
  > .board-create {
    width: 300px;
  }
}

.v-card {
  margin-bottom: 20px;
}
</style>
