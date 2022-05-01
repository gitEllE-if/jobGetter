<template>
  <div class="container-main">
    <header>
      <Header />
    </header>
    <main>
      <div class="container">
        <div class="vacancies-list">
          <div class="vacancies-sort">
            <h2 class="vacancies-sort__h2">Фильтр вакансий</h2>
            <div class="sort-item sort-item-row">
              <div class="sort-item-block">
                <input
                  v-model="view"
                  class="sort-item__input"
                  type="radio"
                  id="viewChoice1"
                  name="view"
                  value="small"
                />
                <label for="viewChoice1">
                  <font-awesome-icon :icon="smallIcon"
                /></label>
              </div>
              <div class="sort-item-block">
                <input
                  v-model="view"
                  class="sort-item__input"
                  type="radio"
                  id="viewChoice2"
                  name="view"
                  value="large"
                />
                <label for="viewChoice2">
                  <font-awesome-icon :icon="largeIcon"
                /></label>
              </div>
            </div>
            <div class="sort-item">
              <div class="sort-item-block">
                <input
                  @change="filterChange"
                  v-model="remote"
                  class="sort-item__input"
                  type="checkbox"
                  id="remote"
                  name="remote"
                  value="remote"
                />
                <label for="remote" class="sort-item__title"
                  ><span></span>
                  удаленно
                </label>
              </div>
              <div class="sort-item-block">
                <input
                  @change="filterChange"
                  v-model="no_experience"
                  class="sort-item__input"
                  type="checkbox"
                  id="no_experience"
                  name="no_experience"
                  value="no_experience"
                />
                <label for="no_experience" class="sort-item__title"
                  ><span></span>
                  без опыта
                </label>
              </div>
            </div>
            <div class="sort-item">
              <div class="sort-item__title">дата публикации:</div>
              <select 
                v-model="selectedTime"
                @change="sortChange"
                class="sort-item__select"
              >
                <option value="descendingTime">сначала новые</option>
                <option value="ascendingTime">сначала старые</option>
              </select>
            </div>
            <div class="sort-item">
              <div class="sort-item__title">заработная плата:</div>
              <select
                v-model="selectedSalary"
                @change="sortChange"
                class="sort-item__select"
              >
                <option value="descendingSalary">по убыванию</option>
                <option value="ascendingSalary">по возрастанию</option>
              </select>
            </div>
          </div>
          <div class="vacancies">
            <div class="vacancies-list__title">
              <h3>Избранные вакансии</h3>
            </div>
            <div v-if="!itemsFavorite.length" class="vacancies-empty">
              вы еще не добавили ни одну вакансию в Избранное
            </div>
            <ItemsList :type="view" :sortedItems="sortedItems" :favorites="true" v-if="itemsFavorite.length"/>
          </div>
        </div>
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
  name: "VacansiesListFavorite",
  data() {
    return {
      angleIcon: faCaretRight,
      smallIcon: faTh,
      largeIcon: faThLarge,
      selectedTime: "descendingTime",
      selectedSalary: "descendingSalary",
      view: "large",
      sortedItems: this.itemsFavorite,
      remote: false,
      no_experience: false,
    };
  },
  components: { ItemsList, Header, Footer, FontAwesomeIcon },
  mounted () {
    this.sortedItems = this.itemsFavorite;
  },
  methods: {
    sortChange(event) {
      const idx = event.target.options.selectedIndex;
      this.sortedItems.sort(SORTER[event.target.options[idx].value]);
    },
    filterChange() {
      this.sortedItems = this.itemsFavorite.filter((vacancy) => {
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
    ...mapGetters({ itemsFavorite: "vacanciesFavorite_getter" })
  },
};
</script>

<style >
</style>
