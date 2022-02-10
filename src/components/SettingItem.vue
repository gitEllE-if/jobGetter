<template>
  <div class="settings__content">
    <div @click="item.show = !item.show" class="myCardHeaderBlock">
      <div class="settings__login">
        <div class="settings__login-title">
          Изменить: <span>{{item.val}}</span>
        </div>
        <div class="settings__login-arrow">
          <svg-arrow-up
              :style="{transform:!item.show ? 'rotateX(180deg)' :'rotateX(0deg)' }"
              class="commission"
          />
        </div>
      </div>
    </div>
    <transition v-if="item.show" name="show-side">
      <div >
        <div >
          <div class="settings__activeLogin" v-if="item.type != 'file'">
            Текущее значение: 
            <span>{{ item.name === 'birthday' && user[item.name] ? user[item.name].substring(0, 10) : user[item.name] }}</span>
          </div>
          <div>
            <div class="settings__login_edit" v-if="item.type != 'radio' && item.type != 'file'">
              <input
                  v-model="item.value"
                  placeholder="Enter new value"
                  name="item.name"
                  :type="item.type"
                  id="item.name"
                  required
              >
            </div>
            <div class="settings__radio" v-if="item.type == 'radio'">
              <div class="settings__radio_item">
                <label for="female">Ж</label>
                <input class="input__radio"
                  v-model="item.value"
                  value='Ж'
                  name="item.name"
                  :type="item.type"
                  id='female'
                  required
                >
              </div>
              <div class="settings__radio_item">
                <label for="male">М</label>
                <input class="input__radio"
                  v-model="item.value"
                  value='М'
                  name="item.name"
                  :type="item.type"
                  id='male'
                  required
                >
              </div>
            </div>
            <div class="settings__login_edit" v-if="item.type == 'file'">
              <div class="settings__photo_item">
                <img v-if="user.photo_url" :src="user.photo_url" alt="user_photo" class="settings__img">
                <input ref="photo"
                  name="item.name"
                  :type="item.type"
                  id='photo_file'
                  required
                >
              </div>
            </div>
          </div>
        </div>
        <div >
          <div class="button__wrapper" >
            <button
                type="button"
                @click="change()"
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import SvgArrowUp from '../svg/SvgArrowUp';
import { mapGetters } from "vuex";
export default {
  name: "SettingItem",
  components: { SvgArrowUp },
  data: () => ({
  }),
  props: {
    item: { type: Object, default: () => ({}) }
  },
  methods:{
    async change() {
      if (this.item.type == 'file') {
        const selectedImage = this.$refs.photo.files[0];
        const reader = new FileReader();
        reader.onload = async (e) => {
          const image = e.target.result;
          await this.$store.dispatch("updateUserPhoto", { id: this.user.id, photo: image});
        };
        reader.readAsDataURL(selectedImage);
      }
      else {
        await this.$store.dispatch("updateUser", { id: this.user.id, newParam: { [this.item.name]: this.item.value }});
      }
    }
  },
  computed: {
    ...mapGetters({ user: "user_getter" })
  },
}
</script>

<style scoped>
  .setting__title{
    text-align: center;
    padding: 20px;
  }
  .settings__login-title{
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    color: #555555;
    padding: 10px;
  }
  .settings__login-title span{
    font-weight: 600;
    color: #142533;
  }
  .myCardHeaderBlock{
    background-color: #f1f1f1 !important;
  }
  .settings__content{
    padding: 10px 40px;
  }
  .settings__login{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
  }
  .settings__activeLogin{
    text-align: center;
    padding: 15px;
    font-size: 18px;
  }
  .settings__activeLogin span{
    font-weight: 600;
    color: #00b0e0;
  }
  .settings__login_edit{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .settings__radio{
    display: flex;
    justify-content: center;
  }
 .settings__radio_item{
    margin: 0 20px;
  }
 input {
    padding: 10px;
    margin: 10px;
    max-width: 350px;
    width: 100%;
  }
  .input__radio {
    padding: initial;
    margin: initial;
  }
  .button__wrapper{
    text-align: center;
  }
  button{
    padding: 10px;
    background: #555555;
    color: #fff;
    outline: none;
    border: none;
    margin: 10px 0;
  }
  button:hover{
    cursor: pointer;
    background: #c7b299;
    border-color: #c7b299;
    transition: 2s;
  }
  .view{
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
  .settings__photo_item{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .settings__img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    object-position: center center;
    border: 1px solid #c7b299;
    border-radius: 5px;
    margin-top: 50px;
    box-shadow: 2px 2px 10px 1px rgba(34, 60, 80, 0.16);
  }
</style>
