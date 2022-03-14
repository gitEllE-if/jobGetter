<template>
  <div class="container-main">
    <header>
      <Header />
    </header>
    <main>
      <div class="container">
        <div class="vacancy-page">
          <h2 class="title__h2">{{ vacancy.name }}</h2>
          <h3 v-if="vacancy.salary" class="title__h3">
            <span v-if="vacancy.salary_from">от {{ vacancy.salary_from }} </span>
            <span v-if="vacancy.salary_to">до {{ vacancy.salary_to }} </span>
            <span v-if="vacancy.currency">{{ vacancy.currency }}</span>
          </h3>
          <div class="vacancy-company">
            <div class="vacancy-company__left">
              <div class="vacancy-company__name">{{ vacancy.employer_name }}</div>
              <div class="vacancy-company__area">{{ vacancy.area }}</div>
            </div>
            <div class="vacancy-company__right">
              <a :href="vacancy.url">
                <img class="vacancy-company__logo" :src="`${vacancy.logo_url ? vacancy.logo_url : ''}`" alt="">
              </a>
            </div>
          </div>
          <p class="vacancy-info" v-if="vacancy.experience">Требуемый опыт работы: {{ vacancy.experience.toLowerCase() }}</p>
          <p class="vacancy-info">{{ vacancy.schedule }}</p>
          <p class="vacancy-text" v-html="vacancy.description"></p>
          <p class="vacancy-info">
            <i class="vacancy-text__publish">Вакансия опубликована {{ vacancy.published_at.substring(0, 10) }} в городе {{ vacancy.area }}</i>
          </p>
          <a :href="vacancy.url" class="vacancy-url">перейти</a>
          <span class="vacancy-provider">
            {{ vacancy.provider }}
          </span>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "@components/Header.vue";
import Footer from "@components/Footer.vue";

export default {
  name: "Vacancy",
  components: { Header, Footer },
  data() {
    return {
      vacancy: this.$store.getters.vacancyById_getter(this.$route.params.id)
    };
  },
  mounted: function () {
    if (!this.$route.params.id || !this.vacancy) {
      this.$router.push({ path: "/" });
    }
  }
};
</script>
