<template>
  <footer>
    <section class="footer-lower">
      <div class="footer-lower-block">
        <p>
          Copyright &copy; 2021
          <a class="footer-lower-allocated" href="#">GeekJob</a>
        </p>
        <a href="#">Политика конфеденциальности</a>
        <router-link to="/about">О компании</router-link>
        <a href="#">Вопросы и ответы</a>
        <a href="#">Поддержка</a>
      </div>
      <div class="footer-icon">
        <a href="#">
        <font-awesome-icon :icon="['fab', 'instagram']" class="social-icon"/>
        </a>
        <a href="#">
          <font-awesome-icon :icon="['fab', 'facebook']" class="social-icon"/>
        </a>
        <a href="#">
          <font-awesome-icon :icon="['fab', 'vk']" class="social-icon"/>
        </a>
        <a href="#">
          <font-awesome-icon :icon="['fab', 'odnoklassniki']" class="social-icon"/>
        </a>
      </div>
    </section>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>

<style >
</style>