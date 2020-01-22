<template>
  <div>
    <v-card class="d-flex flex-column align-center game-card px-2 py-2">
      <div class="d-flex full-width">
        <span class="mr-auto">{{ name }}</span>
      </div>
      <p class="mt-3">{{ message }}</p>
      <div class="full-width">
        <p>Победитель: {{ winner }}</p>
        <p v-if="result === 'victory' || sentRightAnswer">
          Правильный ответ: {{ rightAnswer.artist }} - {{ rightAnswer.title }}
        </p>
        <div
          v-else
          class="full-width d-flex flex-column justify-center align-center"
        >
          <span
            >Введите правильный ответ, пожалуйста, что бы я стал умнее :)</span
          >
          <div
            v-if="!sentRightAnswer"
            class="d-flex flex-column align-center justify-center mb-5"
          >
            <v-text-field
              type="text"
              id="artist-answer"
              color="blue-grey"
              label="Исполнитель"
              class="input-width mt-2"
              v-model="userRightAnswer.artist"
            ></v-text-field>
            <v-text-field
              type="text"
              id="title-answer"
              color="blue-grey"
              label="Название"
              class="input-width mt-2"
              v-model="userRightAnswer.title"
            ></v-text-field>
            <v-btn text icon color="blue-grey" @click="sendRightAnswer()"
              >Ответить</v-btn
            >
          </div>
        </div>
      </div>
      <div class="d-flex justify-center align-center full-width">
        <v-btn text icon color="blue-grey" :x-large="true" @click="replay()"
          ><v-icon>mdi-replay</v-icon></v-btn
        >
        <v-btn
          text
          icon
          color="blue-grey"
          :x-large="true"
          @click="showList = !showList"
          ><v-icon>mdi-format-list-bulleted</v-icon></v-btn
        >
        <v-btn text icon color="blue-grey" :x-large="true" @click="exit()"
          ><v-icon>mdi-exit-to-app</v-icon></v-btn
        >
      </div>
      <v-expand-transition>
        <div v-show="showList">
          <v-divider></v-divider>
          <div class="full-width d-flex flex-column">
            <v-subheader class="align-self-center"
              >Песни, которые я предлагал как ответ:
            </v-subheader>
            <v-list-item v-for="(item, index) in suggestedAnswers" :key="index">
              <v-list-item-content>
                <v-list-item-title
                  >{{ index + 1 }}. {{ item.artist }} -
                  {{ item.title }}</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </div>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      showList: false,
      userRightAnswer: {
        artist: null,
        title: null
      },
      sentRightAnswer: false
    };
  },
  computed: {
    ...mapGetters(["result", "name", "rightAnswer", "suggestedAnswers"]),
    message() {
      return this.result === "victory"
        ? "Ура, я победил!"
        : "У меня закончились идеи :(";
    },
    winner() {
      return this.result === "victory" ? "Akinator" : this.name;
    }
  },
  methods: {
    ...mapActions(["setRightAnswer"]),
    replay() {
      this.$store.dispatch("changeStep", { payLoad: 2 });
    },
    exit() {
      this.$store.dispatch("increaseStep");
    },
    sendRightAnswer() {
      this.sentRightAnswer = true;
      this.setRightAnswer({ payLoad: this.userRightAnswer });
    }
  }
};
</script>
