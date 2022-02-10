<template>
  <div class="container-main">
    <header>
      <Header />
    </header>
    <main>
      <div class="container">
        <div class="about-company-page-cnt">
          <div class="about-company-page-info">
              <h2 class="about-company-page-h2">О нас</h2>
              <p class="about-company-page-text">
                  Job-getter — агрегатор вакансий. 
                  Мы предоставляем возможности, чтобы соискатели могли быстро найти
                  хорошую работу.<br>
                  Job-getter собирает самые актуальные вакансии
                  с крупнейших работных сайтов.<br>
                  Мы поможем Вам изменить свою жизнь к лучшему ;)
              </p>
          </div>
          <div class="about-company-page">
          </div>
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
  name: "AboutCompany",
  components: { Header, Footer }
};
</script>

<style >
</style>