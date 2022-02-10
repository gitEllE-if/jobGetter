<template>
  <div class="container">
    <header>
      <Header />
    </header>
    <main class="vacancies-list">
      <div class="vacancies-sort">
        <div class="vacancies-sort-title">Фильтр вакансий</div>
        <div class="vacancies-sort-item">
          <div class="sort-item-radio">
            <input
              v-model="view"
              type="radio"
              id="viewChoice1"
              name="view"
              value="small"
            />
            <label for="viewChoice1"
              ><font-awesome-icon :icon="smallIcon"
            /></label>
          </div>
          <div class="sort-item-radio">
            <input
              v-model="view"
              type="radio"
              id="viewChoice2"
              name="view"
              value="large"
            />
            <label for="viewChoice2"
              ><font-awesome-icon :icon="largeIcon"
            /></label>
          </div>
        </div>
        <div class="vacancies-sort-item">
          <input
            @change="filterChange"
            v-model="remote"
            type="checkbox"
            id="remote"
            name="remote"
            value="remote"
          />
          <label for="remote" class="sort-item-title"
            ><span></span>
            удаленно
          </label>
        </div>
        <div class="vacancies-sort-item">
          <input
            @change="filterChange"
            v-model="no_experience"
            type="checkbox"
            id="no_experience"
            name="no_experience"
            value="no_experience"
          />
          <label for="no_experience" class="sort-item-title"
            ><span></span>
            без опыта
          </label>
        </div>
        <div class="vacancies-sort-item">
          <div class="sort-item-title">дата публикации:</div>
          <select v-model="selectedTime" @change="sortChange">
            <option value="descendingTime">сначала новые</option>
            <option value="ascendingTime">сначала старые</option>
          </select>
        </div>
        <div class="vacancies-sort-item">
          <div class="sort-item-title">заработная плата:</div>
          <select v-model="selectedSalary" @change="sortChange">
            <option value="descendingSalary">по убыванию</option>
            <option value="ascendingSalary">по возрастанию</option>
          </select>
        </div>
      </div>
      <div class="vacancies">
        <ItemsList :type="view" :sortedItems="sortedItems" />
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
import { SORTER } from "@utils/sortHelper";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faCaretRight,
  faTh,
  faThLarge,
} from "@fortawesome/free-solid-svg-icons";

export default {
  name: "VacansiesList",
  data() {
    return {
      angleIcon: faCaretRight,
      smallIcon: faTh,
      largeIcon: faThLarge,
      selectedTime: "descendingTime",
      selectedSalary: "descendingSalary",
      view: "large",
      sortedItems: this.items,
      remote: false,
      no_experience: false,
    };
  },
  components: { ItemsList, Header, Footer, FontAwesomeIcon },
  methods: {
    sortChange(event) {
      const idx = event.target.options.selectedIndex;
      this.sortedItems.sort(SORTER[event.target.options[idx].value]);
    },
    filterChange() {
      this.sortedItems = this.items.filter((vacancy) => {
        if (this.remote && !this.no_experience) {
          return vacancy.remote == this.remote;
        } else if (this.no_experience && !this.remote) {
          return vacancy.no_experience == this.no_experience;
        } else if (this.remote && this.no_experience) {
          return (
            vacancy.remote == this.remote &&
            vacancy.no_experience == this.no_experience
          );
        } else {
          return true;
        }
      });
    },
  },
  computed: {
    ...mapGetters({ items: "vacancies_getter" }),
  },
};
</script>

<style >
</style>
