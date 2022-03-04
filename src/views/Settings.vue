<template>
  <div class="container">
    <header>
      <Header />
    </header>
    <main class="settings">
      <h2 class="setting__title">Settings</h2>
      <div class="settings__content">
        <div
          @click="settings.password.show = !settings.password.show"
          class="myCardHeaderBlock"
        >
          <div class="settings__login">
            <div class="settings__login-title mySectionTitle">
              Изменить: <span>{{ settings.password.val }}</span>
            </div>
            <div class="settings__login-arrow">
              <svg-arrow-up
                :style="{
                  transform: !settings.password.show
                    ? 'rotateX(180deg)'
                    : 'rotateX(0deg)',
                }"
                class="commission"
              />
            </div>
          </div>
        </div>
        <transition v-if="settings.password.show" name="show-side">
          <div class="settings__password">
            <div>
              <div class="settings__password-item">
                <label for="oldPassword">Текущий пароль</label>
                <input
                  v-model="settings.old_password"
                  :type="passwordFiledType"
                  id="oldPassword"
                  name="old_password"
                  required
                />
                <a
                  href="#"
                  :class="{ view: !passwordShow, no__view: passwordShow }"
                  @click="showPassword"
                ></a>
              </div>
              <div class="settings__password-item">
                <label for="newPassword">Новый пароль</label>
                <input
                  v-model="settings.password.value"
                  :type="passwordNewFiledType"
                  id="newPassword"
                  name="new_password"
                  required
                />
                <a
                  href="#"
                  :class="{ view: !passwordShowNew, no__view: passwordShowNew }"
                  @click="showPasswordNew"
                ></a>
              </div>
              <div class="settings__password-item">
                <label for="confirmationNewPassword">Повторите пароль</label>
                <input
                  v-model="settings.password_confirmation"
                  :type="passwordConfirmFiledType"
                  id="confirmationNewPassword"
                  name="password_confirmation"
                  required
                />
                <a
                  href="#"
                  :class="{
                    view: !passwordShowConfirm,
                    no__view: passwordShowConfirm,
                  }"
                  @click="showPasswordConfirm"
                ></a>
              </div>
            </div>
            <div class="col-12 text-center">
              <button type="button" @click="changePassword">Сохранить</button>
            </div>
          </div>
        </transition>
      </div>
      <SettingItem v-for="item of settingsAll" :key="item.name" :item="item" />
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "@components/Header.vue";
import Footer from "@components/Footer.vue";
import SettingItem from "@components/SettingItem.vue";
import SvgArrowUp from "@components/svg/SvgArrowUp";
import { mapGetters } from "vuex";
export default {
  name: "Settings",
  components: { Header, Footer, SvgArrowUp, SettingItem },
  data: () => ({
    settings: {
      old_password: "",
      password_confirmation: "",
      password: { value: "", show: false, val: "password" },
    },
    settingsAll: [
      { name: "photo_url", value: "", show: false, val: "фото", type: "file" },
      { name: "login", value: "", show: false, val: "логин", type: "text" },
      { name: "first_name", value: "", show: false, val: "имя", type: "text" },
      {
        name: "last_name",
        value: "",
        show: false,
        val: "фамилия",
        type: "text",
      },
      { name: "gender", value: "", show: false, val: "пол", type: "radio" },
      {
        name: "birthday",
        value: "",
        show: false,
        val: "дата рождения",
        type: "date",
      },
      { name: "city", value: "", show: false, val: "город", type: "text" },
      { name: "address", value: "", show: false, val: "адрес", type: "text" },
      { name: "email", value: "", show: false, val: "email", type: "email" },
      { name: "phone", value: "", show: false, val: "телефон", type: "tel" },
    ],
    passwordFiledType: "password",
    passwordNewFiledType: "password",
    passwordConfirmFiledType: "password",
    passwordShow: false,
    passwordShowNew: false,
    passwordShowConfirm: false,
    photo_file: "",
  }),
  computed: {
    ...mapGetters({ userLogin: "userLogin_getter" }),
    ...mapGetters({ user: "user_getter" }),
  },
  methods: {
    async changePassword() {
      await this.$store.dispatch("updateUser", {
        id: this.user.id,
        newParam: { password: this.settings.password.value },
      });
    },
    showPassword() {
      if (this.passwordFiledType === "password") {
        this.passwordFiledType = "text";
        this.passwordShow = true;
      } else {
        this.passwordFiledType = "password";
        this.passwordShow = false;
      }
    },
    showPasswordNew() {
      if (this.passwordNewFiledType === "password") {
        this.passwordNewFiledType = "text";
        this.passwordShowNew = true;
      } else {
        this.passwordNewFiledType = "password";
        this.passwordShowNew = false;
      }
    },
    showPasswordConfirm() {
      if (this.passwordConfirmFiledType === "password") {
        this.passwordConfirmFiledType = "text";
        this.passwordShowConfirm = true;
      } else {
        this.passwordConfirmFiledType = "password";
        this.passwordShowConfirm = false;
      }
    },
  },
};
</script>

<style scoped>
.settings {
  font-family: "raleway", "arial", sans-serif;
}
.setting__title {
  text-align: center;
  padding: 20px;
  color: #555555;
}
.settings__login-title {
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #555555;
  padding: 10px;
}
.settings__login-title span {
  font-weight: 600;
  color: #142533;
}
.myCardHeaderBlock {
  background-color: #f1f1f1 !important;
}
.settings__content {
  padding: 10px 40px;
}
.settings__login {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}
.settings__activeLogin {
  text-align: center;
  padding: 5px;
  font-size: 20px;
}
.settings__login_edit {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
input {
  padding: 10px;
  margin: 10px;
  max-width: 350px;
  width: 100%;
}
.button__wrapper {
  text-align: center;
}
button {
  padding: 10px;
  background: #555555;
  color: #fff;
  outline: none;
  border: none;
  margin: 10px 0;
}
button:hover {
  cursor: pointer;
  background: #c7b299;
  border-color: #c7b299;
  transition: 2s;
}
.settings__password {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 10px;
}
.settings__password-item {
  position: relative;
}
.view {
  position: absolute;
  top: 38px;
  right: -15px;
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url(https://snipp.ru/demo/495/view.svg) 0 0 no-repeat;
}
.no__view {
  position: absolute;
  top: 38px;
  right: -15px;
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url(https://snipp.ru/demo/495/no-view.svg) 0 0 no-repeat;
}
</style>
