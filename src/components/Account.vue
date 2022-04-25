<template>
  <div class="account">
    <button class="account__button" @click="showAccount = !showAccount">
      Login
    </button>
    <form ref="formLogin"></form>
    <div class="menu-drop" v-show="showAccount">
      <div class="menu-drop-name" v-show="user">
        Welcome, You signed as:<span> {{ user }}</span>
      </div>
      <div class="menu-drop-message" v-show="message">
        {{ message }}
      </div>
      <label class="menu-drop__label" for="login">Login</label>
      <input class="menu-drop__input" name="login" type="text" v-model="login" />
      <label class="menu-drop__label" for="password">Password</label>
      <input class="menu-drop__input" name="password" type="password" v-model="password" />
      <div class="menu-drop__buttons">
        <button
          class="account__button menu-drop__button"
          name="login"
          @click.prevent="loginRequest($event)"
        >
          Sign in
        </button>
        <button
          class="account__button menu-drop__button"
          name="register"
          @click.prevent="loginRequest($event)"
        >
          Register
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showAccount: false,
      login: "",
      password: "",
      user: "",
      message: ""
    };
  },
  async mounted() {
    this.message = "";
    this.user = "";
    try {
      const response = await this.$store.dispatch("getUser");
      if (response.result) {
        this.user = response.result.login;
      } else {
        this.message = response.message;
      }
    } catch (err) {
      this.message = "The error occurred while login";
      console.log(err);
    }
  },
  methods: {
    async loginRequest(event) {
      this.message = "";
      try {
        if (this.login && this.password) {
          const data = {
            login: this.login,
            password: this.password,
            action: event.target.name
          };
          const result = await this.$store.dispatch("login", data);
          if (result.user) {
            this.user = result.user.login;
            this.$refs.formLogin.submit();
          }
          if (result.message) {
            this.message = result.message;
          }
        } else {
          this.message = "Please enter login and password";
        }
      } catch (err) {
        this.message = "The error occurred while login";
        console.log(err);
      }
    }
  }
};
</script>
