<template>
  <div class="container">
    <header>
      <Header />
    </header>
    <main>
      <div class="vacancy-page">
        <div class="page inner-cnt">
          <h2>{{ vacancy.name }}</h2>
          <h3 v-if="vacancy.salary">
            <span v-if="vacancy.salary_from">от {{ vacancy.salary_from }} </span>
            <span v-if="vacancy.salary_to">до {{ vacancy.salary_to }} </span>
            <span v-if="vacancy.currency">{{ vacancy.currency }}</span>
          </h3>
          <div class="company">
            <div class="block-left">
              <div class="name-company">{{ vacancy.employer_name }}</div>
              <div class="text">{{ vacancy.area }}</div>
            </div>
            <div class="block-right">
              <a :href="vacancy.url">
                <img class="logo-image" :src="`${vacancy.logo_url ? vacancy.logo_url : ''}`" alt="">
              </a>
            </div>
          </div>
          
          <p class="text margin-top-30" v-if="vacancy.experience">Требуемый опыт работы: {{ vacancy.experience.toLowerCase() }}</p>
          <p class="text">{{ vacancy.schedule }}</p>
          <div>
            <p class="text" v-html="vacancy.description">
            </p>
            <p class="text margin-top-30">
              <i class="publish-info">Вакансия опубликована {{ vacancy.published_at.substring(0, 10) }} в городе {{ vacancy.area }}</i>
            </p>
          </div>
        </div>
        <a :href="vacancy.url" class="vacancy-page-url">перейти</a>
        <span class="provider">
          {{ vacancy.provider }}
        </span>
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
