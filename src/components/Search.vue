<template>
  <div class="searchinput">
    <form class="searchWrap">
      <input
          placeholder="Профессия, должность"
          type="text"
          v-model="vacancyText"
      />
      <button class="button-search" @click="findItems($event)">
        Найти работу
      </button>
    </form>
  </div>
</template>
<script>
import {mapGetters} from "vuex";
import {PROVIDERS} from "../providers";
import {SearchFilter} from "../domain/SearchFilter";
import {descendingTimeCompare} from "../utils/sortHelper";
import { instanceAuth as api } from "@api";

export default {
  name: "Search",
  data() {
    return {
      vacancyText: "",
    };
  },
  props: {
    selectedCity: {
      type: String,
      default: ""
    },
    selectedProfession: {
      type: String,
      default: ""
    }
  },
  methods: {
    async findItems(event) {
      event.preventDefault();
      try {
        const searchResult = [];
        const filter = SearchFilter.byText(this.vacancyText);
        filter.city = this.selectedCity;
        filter.profession = this.selectedProfession;
        for (let provider in PROVIDERS){
          const res = PROVIDERS[provider].find(filter);
          if (res){
            searchResult.push(res);
          }
        }
        Promise.all(searchResult)
            .then(async (vacancies) => {
              const newVacancies = [].concat(...vacancies);
              newVacancies.sort(descendingTimeCompare);
              if (this.userLogin == "unknown") {
                this.$store.dispatch("getVacancies", newVacancies);
              } else {
                await api.delete("/vacancies");
                await api.post("/vacancies", newVacancies);
                await this.$store.dispatch("getVacanciesFromBD");
              }
              this.$emit('scrollToVacancies');

            })
      } catch (err) {
        console.log("==> find vacancies failure " + err);
      }
    },
  },
  computed: {
    ...mapGetters({ userLogin: "userLogin_getter" }),
    ...mapGetters({ items: "vacancies_getter" }),
  }
};
</script>
