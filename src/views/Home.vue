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
            <li  v-for="prof in professionArr" :key="prof.name" class="profession-multiple-item">
              <a @click="selectProfession(prof.name)">
                <span :class="{ selected: prof.selected }">{{ prof.name }}</span>
              </a>
            </li>
          </ul>
          <button class="profession-block-city-button" @click="resetProfession">сбросить</button>
        </div>
        <div class="profession-block-city">
          <h2 class="profession-block-header">Работа в других городах</h2>
          <ul class="profession-block-city-multiple">
            <li  v-for="city in cityArr" :key="city.name" class="profession-multiple-item">
              <a @click="selectCity(city.name)">
                <span :class="{ selected: city.selected }">Работа в {{ city.text }}</span>
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

export default {
  name: "Home",
  components: { Search, ItemsList, Header, Footer },
  data() {
    return {
      cityArr: [
        {name: 'Москва', text: 'Москве', selected: false},
        {name: 'Санкт-Петербург', text: 'Санкт-Петербурге', selected: false},
        {name: 'Новосибирск', text: 'Новосибирске', selected: false},
        {name: 'Ектеринбург', text: 'Екатеринбурге', selected: false},
        {name: 'Казань', text: 'Казани', selected: false},
        {name: 'Красноярск', text: 'Красноярске', selected: false},
        {name: 'Челябинск', text: 'Челябинске', selected: false},
        {name: 'Омск', text: 'Омске', selected: false},
        {name: 'Самара', text: 'Самаре', selected: false},
        {name: 'Уфа', text: 'Уфе', selected: false},
      ],
      professionArr: [
        {name: 'Программирование, разработка', selected: false},
        {name: 'web-разработка', selected: false},
        {name: 'Верстка', selected: false},
        {name: 'Игровое ПО / Геймдев', selected: false},
        {name: 'Администратор баз данных', selected: false},
        {name: 'Тестирование, QA', selected: false},
        {name: 'Аналитика', selected: false},
        {name: 'Кибербезопасность', selected: false},
        {name: 'Оптимизация, SEO', selected: false},
        {name: 'Контент', selected: false},
        {name: 'Системный администратор', selected: false},
        {name: 'Дизайн', selected: false},
        {name: 'Компьютерная анимация, мультимедиа', selected: false},
        {name: 'Передача данных и доступ в интернет', selected: false},
        {name: 'Банковское ПО', selected: false},
        {name: 'Сетевые технологии', selected: false},
        {name: 'Системная интеграция', selected: false},
        {name: 'Телекоммуникации и связь', selected: false},
        {name: 'CRM системы', selected: false},
        {name: 'Сотовые, беспроводные технологии', selected: false},
        {name: 'Системы автоматизированного проектирования', selected: false},
        {name: 'Системы управления предприятием (ERP)', selected: false},
        {name: 'Техническая поддержка', selected: false},
        {name: 'Электронная коммерция', selected: false},
        {name: 'Управление проектами', selected: false},
        {name: 'Менеджмент продукта', selected: false},
        {name: 'Маркетинг', selected: false},
        {name: 'Начало карьеры, мало опыта', selected: false},
      ],
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
      this.cityArr.forEach((city) => { city.selected = city.name === newCity ? true : false });
    },
    selectProfession(newProfession){
      this.selectedProfession = newProfession;
      this.professionArr.forEach((prof) => { prof.selected = prof.name === newProfession ? true : false });
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
