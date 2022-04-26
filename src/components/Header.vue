<template>
  <div class="header">
    <router-link to="/" class="header-logo">
      <svg
        class="header-logo__svg"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 385 512"
      >
        <path
          d="M42.6 403.3h2.8c12.7 0 25.5 0 38.2.1 1.6 0 3.1-.4 3.6 2.1 7.1 34.9 30 54.6 62.9 63.9 26.9 7.6 54.1 7.8 81.3 1.8 33.8-7.4 56-28.3 68-60.4 8-21.5 10.7-43.8 11-66.5.1-5.8.3-47-.2-52.8l-.9-.3c-.8 1.5-1.7 2.9-2.5 4.4-22.1 43.1-61.3 67.4-105.4 69.1-103 4-169.4-57-172-176.2-.5-23.7 1.8-46.9 8.3-69.7C58.3 47.7 112.3.6 191.6 0c61.3-.4 101.5 38.7 116.2 70.3.5 1.1 1.3 2.3 2.4 1.9V10.6h44.3c0 280.3.1 332.2.1 332.2-.1 78.5-26.7 143.7-103 162.2-69.5 16.9-159 4.8-196-57.2-8-13.5-11.8-28.3-13-44.5zM188.9 36.5c-52.5-.5-108.5 40.7-115 133.8-4.1 59 14.8 122.2 71.5 148.6 27.6 12.9 74.3 15 108.3-8.7 47.6-33.2 62.7-97 54.8-154-9.7-71.1-47.8-120-119.6-119.7z"
        />
      </svg>
      <span class="header-logo__text">Job&#8209;getter</span>
    </router-link>
    <nav class="header-menu">
      <input class="menu-mobile__input" id="menu-mobile" type="checkbox" />
      <label class="menu-mobile__label" for="menu-mobile">
        <div class="menu-mobile__icon"></div>
      </label>
      <ul class="header-menu__ul">
        <li class="header-menu__li">
            <router-link to="/" class="header-menu__link">Главная</router-link>
        </li>
         <li class="header-menu__li">
            <router-link to="/vacancies_list" class="header-menu__link">Вакансии</router-link>
        </li>
        <li class="header-menu__li">
            <router-link to="/about" class="header-menu__link">О нас</router-link>
        </li>
        <li class="header-menu__li header-menu__li__login">
            <Account v-if="userLogin === 'unknown'" />
        </li>
        <li v-if="userLogin !== 'unknown'">
          <div class="header-menu__account">
            <button
              class="header-menu__button"
              @click="toggleClick"
            >
              <svg
                class="header-menu__svg"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="32"
                height="32"
                viewBox="0 0 40 40"
              >
                <path
                  d="M16,29A13,13,0,1,1,29,16,13,13,0,0,1,16,29ZM16,5A11,11,0,1,0,27,16,11,11,0,0,0,16,5Z"
                />
                <path
                  d="M16,17a5,5,0,1,1,5-5A5,5,0,0,1,16,17Zm0-8a3,3,0,1,0,3,3A3,3,0,0,0,16,9Z"
                />
                <path
                  d="M25.55,24a1,1,0,0,1-.74-.32A11.35,11.35,0,0,0,16.46,20h-.92a11.27,11.27,0,0,0-7.85,3.16,1,1,0,0,1-1.38-1.44A13.24,13.24,0,0,1,15.54,18h.92a13.39,13.39,0,0,1,9.82,4.32A1,1,0,0,1,25.55,24Z"
                />
              </svg>
            </button>
            <div class="header-menu-drop" v-show="isOpen">
              <router-link to="/profile"> Профиль</router-link>
              <router-link to="/settings"> Настройки</router-link>
              <router-link to="/vacancies_favorite">
                Избранное
                <span class="header-menu-drop__span" v-if="favoritesCnt">
                  {{ favoritesCnt }}
                </span>
              </router-link>
              <router-link to="/cv"> Резюме</router-link>
              <hr />
              <a @click="logout">Выход</a>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Account from "@components/Account.vue";
import { mapGetters } from "vuex";

export default {
  name: "Header",
  components: { Account },
  data() {
    return {
      isOpen: false,
    };
  },
  mounted() {},
  methods: {
    toggleClick() {
      this.isOpen = !this.isOpen;
    },
    logout() {
      this.$router.push("/");
      location.reload();
      window.localStorage.removeItem("tokenAuth");
      this.$store.commit("setUserLogin", "unknown");
      this.$store.commit("setUser", null);
    },
  },
  computed: {
    ...mapGetters({ userLogin: "userLogin_getter" }),
    ...mapGetters({ itemsFavorite: "vacanciesFavorite_getter" }),
    favoritesCnt: function () {
      return this.itemsFavorite.length;
    },
  },
};
</script>
