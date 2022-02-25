<template>
  <div class="container-main">
    <header class="main-header">
      <Header />
      <div class="container">
        <Search @scrollToVacancies="scrollToVacancies"
          :selectedCity="selectedCity"
          :selectedProfession="selectedProfession"/>
        <div class="tagline">
          <h4 class="tagline-txt">Тысячи возможностей</h4>
          <h4 class="tagline-txt">Выбери свою</h4>
        </div>
      </div>
    </header> 
    <main>
      <div class="container">
      <section class="profession-block">
        <div class="profession-block-name">
          <h2 class="profession-block-header">Работа по профессиям</h2>
          <ul class="profession-block-multiple">
            <li  v-for="prof in professionArr" :key="prof.value" class="profession-multiple-item">
              <a @click="selectProfession(prof.text)">
                <span :class="{ selected: prof.selected }">{{ prof.text }}</span>
              </a>
            </li>
          </ul>
          <button class="profession-block-city-button" @click="resetProfession">сбросить</button>
        </div>
        <div class="profession-block-city">
          <h2 class="profession-block-header">Работа в других городах</h2>
          <ul class="profession-block-city-multiple">
            <li  v-for="city in cityArr" :key="city.value" class="profession-multiple-item">
              <a @click="selectCity(city.text)">
                <span :class="{ selected: city.selected }">Работа в {{ city.text_opt }}</span>
              </a>
            </li>
          </ul>
          <button class="profession-block-city-button" @click="resetCity">сбросить</button>
        </div>
      </section>
      <section class="vacancies" v-show="items.length" ref="refVacancies">
        <router-link to="/vacancies_list">
          <h3 class="section-title">Вакансии</h3>
        </router-link>
        <ItemsList />
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

export default {
  name: "Home",
  components: { Search, ItemsList, Header, Footer },
  data() {
    return {
      cityArr: CITIES,
      professionArr: PROFESSIONS,
      selectedCity: "",
      selectedProfession: ""
    };
  },
  async mounted() {
    await this.$store.dispatch("getVacanciesFromBD");
  },
  methods: {
    scrollToVacancies() {
      this.$nextTick(function () {
        this.$refs.refVacancies.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      });
    },
    selectCity(newCity){
      this.selectedCity = newCity;
      this.cityArr.forEach((city) => { city.selected = city.text === newCity ? true : false });
    },
    selectProfession(newProfession){
      this.selectedProfession = newProfession;
      this.professionArr.forEach((prof) => { prof.selected = prof.text === newProfession ? true : false });
    },
    resetCity(){
      this.selectedCity = '';
      this.cityArr.forEach((city) => { city.selected = false });
    },
    resetProfession(){
      this.selectedProfession = '';
      this.professionArr.forEach((prof) => { prof.selected = false });
    },
  },
  computed: {
    ...mapGetters({ userLogin: "userLogin_getter" }),
    ...mapGetters({ items: "vacancies_getter" }),
  }
};
</script>

<style scoped >

</style>
