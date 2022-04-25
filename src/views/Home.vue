<template>
  <div class="container-main">
    <header class="header-main">
      <Header />
      <div class="container">
        <Search @scrollToVacancies="scrollToVacancies" />
        <div class="header-main-title">
          <h1 class="header-main-title__h1">Тысячи возможностей</h1>
          <h2 class="header-main-title__h2">выбери свою</h2>
        </div>
      </div>
    </header>
    <main>
      <div class="container">
        <section class="profession-block">
          <div class="profession-block-name">
            <h2 class="profession-block-header">Работа по профессиям</h2>
            <ul class="profession-block-multiple">
              <li
                v-for="prof in professionArr"
                :key="prof.value"
                class="profession-multiple-item"
              >
                <a @click="selectProfession(prof.text)">
                  <span :class="{ selected: prof.selected }">{{
                    prof.text
                  }}</span>
                </a>
              </li>
            </ul>
            <button
              class="profession-block-city-button"
              @click="resetProfession"
            >
              сбросить
            </button>
          </div>
          <div class="profession-block-city">
            <h2 class="profession-block-header">Работа в других городах</h2>
            <ul class="profession-block-city-multiple">
              <li
                v-for="city in cityArr"
                :key="city.value"
                class="profession-multiple-item"
              >
                <a @click="selectCity(city.text)">
                  <span :class="{ selected: city.selected }"
                    >Работа в {{ city.text_opt }}</span
                  >
                </a>
              </li>
            </ul>
            <button class="profession-block-city-button" @click="resetCity">
              сбросить
            </button>
          </div>
        </section>
        <section class="section-block" v-show="items.length" ref="refVacancies">
          <router-link to="/vacancies_list">
            <h3 class="section-block__title">
              Вакансии<span v-if="city" class="section-block__span">
                в городе {{ city }}</span
              >
            </h3>
            <h5 class="section-block__subtitle" v-if="profession">{{ profession }}</h5>
          </router-link>
          <ItemsList />
          <button v-if="items.length < 200" class="section-block__button" @click="loadVacancies($event)">
            загрузить еще
          </button>
        </section>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import ItemsList from "@components/ItemsList.vue";
import Header from "@components/Header.vue";
import Footer from "@components/Footer.vue";
import { mapGetters } from "vuex";
import Search from "../components/Search";
import { CITIES, PROFESSIONS } from "@constants";
import { PROVIDERS } from "../providers";
import { searchFilter } from "../domain/SearchFilter";
import { descendingTimeCompare } from "../utils/sortHelper";
import { instanceAuth as api } from "@api";

export default {
  name: "Home",
  components: { Search, ItemsList, Header, Footer },
  data() {
    return {
      cityArr: CITIES,
      professionArr: PROFESSIONS,
    };
  },
  async mounted() {
    await this.$store.dispatch("getVacanciesFromBD");
    if (this.city) {
      this.cityArr.forEach((city) => {
        city.selected = city.text === this.city ? true : false;
      });
    }
    if (this.profession) {
      this.professionArr.forEach((prof) => {
        prof.selected = prof.text === this.profession ? true : false;
      });
    }
  },
  methods: {
    scrollToVacancies() {
      this.$refs.refVacancies.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    },
    selectCity(newCity) {
      this.cityArr.forEach((city) => {
        city.selected = city.text === newCity ? true : false;
      });
      this.city = newCity;
    },
    selectProfession(newProfession) {
      this.professionArr.forEach((prof) => {
        prof.selected = prof.text === newProfession ? true : false;
      });
      this.profession = newProfession;
    },
    resetCity() {
      this.cityArr.forEach((city) => {
        city.selected = false;
      });
      this.city = "";
    },
    resetProfession() {
      this.professionArr.forEach((prof) => {
        prof.selected = false;
      });
      this.profession = "";
    },
    async loadVacancies(event){
      event.preventDefault();
      try {
        const searchResult = [];
        searchFilter.text = this.keyword;
        searchFilter.city = this.city;
        searchFilter.profession = this.profession;
        searchFilter.page++;
        for (let provider in PROVIDERS) {
          const res = PROVIDERS[provider].find(searchFilter);
          if (res) {
            searchResult.push(res);
          }
        }
        Promise.all(searchResult).then(async (vacancies) => {
          const newVacancies = [].concat(...vacancies);
          newVacancies.sort(descendingTimeCompare);
          if (this.userLogin == "unknown") {
            this.$store.dispatch("updateVacancies", newVacancies);
          } else {
            await api.post("/vacancies", newVacancies);
            await this.$store.dispatch("getVacanciesFromBD");
          }
        });
      } catch (err) {
        console.log("==> load more vacancies failure " + err);
      }
    }
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
    ...mapGetters({ keyword: "keyword_getter" })
  },
  watch: {
    city: function () {
      this.cityArr.forEach((city) => {
        city.selected = city.text === this.city ? true : false;
      });
    },
    profession: function () {
      this.professionArr.forEach((prof) => {
        prof.selected = prof.text === this.profession ? true : false;
      });
    },
  },
};
</script>

<style>
</style>
