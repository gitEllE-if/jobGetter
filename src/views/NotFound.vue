<template>
  <div class="container-main">
    <header>
      <Header />
    </header>
    <main>
      <div class="container">
        <div class="notfound-cnt">
          <div class="notfound-page">
            <h1 class="notfound-404">404</h1>
            <h3 class="notfound-text">Такой страницы у нас нет... Зато есть другие  <span>(=^ｪ^=)</span></h3>
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
  name: "NotFound",
  components: { Header, Footer }
}
</script>

<style>

</style>