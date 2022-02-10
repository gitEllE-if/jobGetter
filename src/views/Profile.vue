<template>
  <div class="container">
    <header>
      <Header />
    </header>
    <main>
      <h2 class="profile__title">Найди вакансию своей мечты</h2>
      <Search />
      <div class="profile__content">
        <img
          v-if="user.photo_url"
          :src="user.photo_url"
          alt="user_photo"
          class="profile__img"
        />
        <p>
          <span>логин: </span>
          <span class="profile__data">{{ user.login }}</span>
        </p>
        <p v-if="user.first_name">
          <span>имя: </span>
          <span class="profile__data">{{ user.first_name }}</span>
        </p>
        <p v-if="user.last_name">
          <span>фамилия: </span>
          <span class="profile__data">{{ user.last_name }}</span>
        </p>
        <p v-if="user.phone">
          <span>телефон: </span>
          <span class="profile__data">{{ user.phone }}</span>
        </p>
        <p v-if="user.email">
          <span>e-mail: </span>
          <span class="profile__data">{{ user.email }}</span>
        </p>
        <p v-if="user.city">
          <span>город: </span>
          <span class="profile__data">{{ user.city }}</span>
        </p>
        <p v-if="user.address">
          <span>адрес: </span>
          <span class="profile__data">{{ user.address }}</span>
        </p>
        <router-link to="/settings" class="profile__button">изменить</router-link>
      </div>
      <ItemsList />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "@components/Header.vue";
import Footer from "@components/Footer.vue";
import Search from "../components/Search";
import ItemsList from "../components/ItemsList";
import { mapGetters } from "vuex";

export default {
  name: "Profile",
  components: { Search, Header, Footer, ItemsList },
  computed: {
    ...mapGetters({ user: "user_getter" }),
  },
};
</script>

<style >
.profile__title {
  font-family: "montserrat", "arial", sans-serif;
  text-align: center;
  padding: 10px;
  margin-top: 30px;
  color: #555555;
}
.searchWrap {
  border: 1px solid #ccc;
}
.profile__content {
  font-family: "montserrat", "arial", sans-serif;
  color: #8c8c8c;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;
  padding: 20px 0;
  background-color: #fbfaf8;
}

.profile__content p {
  width:100%;
  max-width: 750px;
  display: flex;
  justify-content: space-between;
  align-self: center;
  margin-bottom: 10px;
}

.profile__content p > span {
    margin: 0 10px;
}

.profile__data {
  font-weight: 400;
  color: #555555;
}

.profile__button {
  width: 100px;
  padding: 5px 10px;
  margin-top: 20px;
  border: 0;
  border: 1px solid #0088ad;
  border-radius: 5px;
  color: #0088ad;
  font-family: "raleway", "arial", sans-serif;
  font-size: 12px;
  font-weight: 400;
  font-style: normal;
  text-align: center;
  align-self: center;
}

.profile__button:hover {
  background-color: #0088ad;
  color: white;
}

.profile__img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  object-position: center center;
  border: 1px solid #c7b299;
  border-radius: 5px;
  align-self: center;
  margin: 5px 5px 20px 5px;
}

</style>
