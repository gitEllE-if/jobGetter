<template>
  <footer class="footer">
    <div class="footer-nav">
      <p class="footer-nav__p">
        Copyright &copy; {{ year }}
        <a class="footer-logo" href="/">Job-getter</a>
      </p>
      <a href="#">Политика конфеденциальности</a>
      <router-link to="/about">О компании</router-link>
      <a href="#">Вопросы и ответы</a>
      <a href="#">Поддержка</a>
    </div>
    <div class="footer-icon">
      <div class="footer-icon__title">Вакансии предоставлены с сайтов:</div>
      <div class="footer-icon__items">
        <a href="https://hh.ru">
          <svg-provider-1 class="footer-icon__svg" />
        </a>
        <a href="https://superjob.ru">
          <svg-provider-2 class="footer-icon__svg footer-icon__svg__small" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
import SvgProvider1 from "@components/svg/SvgProvider1";
import SvgProvider2 from "@components/svg/SvgProvider2";
export default {
  components: { SvgProvider1, SvgProvider2 },
  name: "Footer",
  computed: {
    year: () => {
      return new Date().getFullYear();
    },
  },
};
</script>

<style >
</style>