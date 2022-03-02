<template>
  <div class="search">
    <form class="search__form">
      <input
        class="search__input"
        placeholder="ключевое слово"
        type="text"
        v-model="vacancyText"
      />
      <select v-model="city" class="search__select">
        <option disabled selected value="">город</option>
        <option v-for="city in cityArr" :value="city.text" :key="city.value">
          {{ city.text }}
        </option>
        <option value="">-</option>
      </select>
      <select v-model="profession" class="search__select">
        <option disabled selected value="">профессия</option>
        <option
          v-for="prof in professionArr"
          :value="prof.text"
          :key="prof.value"
        >
          {{ prof.text }}
        </option>
        <option value="">-</option>
      </select>
      <button class="search__button" @click="findItems($event)">
        Найти работу
      </button>
    </form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { PROVIDERS } from "../providers";
import { SearchFilter } from "../domain/SearchFilter";
import { descendingTimeCompare } from "../utils/sortHelper";
import { instanceAuth as api } from "@api";
import { CITIES, PROFESSIONS } from "@constants";

export default {
  name: "Search",
  data() {
    return {
      cityArr: CITIES,
      professionArr: PROFESSIONS,
      vacancyText: "",
    };
  },
  props: {},
  methods: {
    async findItems(event) {
      event.preventDefault();
      try {
        const searchResult = [];
        const filter = SearchFilter.byText(this.vacancyText);
        filter.city = this.city;
        filter.profession = this.profession;
        for (let provider in PROVIDERS) {
          const res = PROVIDERS[provider].find(filter);
          if (res) {
            searchResult.push(res);
          }
        }
        Promise.all(searchResult).then(async (vacancies) => {
          const newVacancies = [].concat(...vacancies);
          newVacancies.sort(descendingTimeCompare);
          this.$emit("scrollToVacancies");
          if (this.userLogin == "unknown") {
            this.$store.dispatch("getVacancies", newVacancies);
          } else {
            await api.delete("/vacancies");
            await api.post("/vacancies", newVacancies);
            await this.$store.dispatch("getVacanciesFromBD");
          }
        });
      } catch (err) {
        console.log("==> find vacancies failure " + err);
      }
    },
  },
  computed: {
    city: {
      get() {
        return this.$store.getters["city_getter"];
      },
      set(newCity) {
        this.$store.commit("setCity", newCity);
      },
    },
    profession: {
      get() {
        return this.$store.getters["profession_getter"];
      },
      set(newProfession) {
        this.$store.commit("setProfession", newProfession);
      },
    },
    ...mapGetters({ userLogin: "userLogin_getter" }),
    ...mapGetters({ items: "vacancies_getter" }),
  },
};
</script>
