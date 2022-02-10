<template>
  <div class="container">
    <header>
      <Header />
    </header>
    <main>
      <h2 class="cv__title">Резюме</h2>
      <div class="cv__content">
        <img v-if="user.photo_url" :src="user.photo_url" alt="user_photo" class="profile__img">
        <section class="cv__section">
          <h3>Контактные данные</h3>
          <p>
            <label>имя: </label>
            <input v-model="cv.first_name" class="profile__data" type="text"/>
          </p>
          <p>
            <label>фамилия: </label>
            <input v-model="cv.last_name" class="profile__data" type="text"/>
          </p>
          <p>
            <label>телефон: </label>
            <input v-model="cv.phone" class="profile__data" type="phone"/>
          </p>
          <p>
            <label>e-mail: </label>
            <input v-model="cv.email" class="profile__data" type="email"/>
          </p>
          <p>
            <label>город: </label>
            <input v-model="cv.city" class="profile__data" type="text"/>
          </p>
          <p>
            <label>адрес: </label>
            <input v-model="cv.address" class="profile__data" type="text"/>
          </p>
        </section>
        <section class="cv__section">
          <h3>Основная информация</h3>
          <p>
            <label>дата рождения: </label>
            <input v-model="cv.birthday" class="profile__data" type="date"/>
          </p>
          <div class="cv__section_item">
            <label>пол: </label>
            <div class="cv__radio">
              <div class="cv__radio_item">
                <label for="female">женский</label>
                <input class="cv__input"
                  v-model="cv.gender"
                  value='Ж'
                  type="radio"
                  id='female'
                />
              </div>
              <div class="cv__radio_item">
                <label for="male">мужской</label>
                <input class="cv__input"
                  v-model="cv.gender"
                  value='М'
                  type="radio"
                  id='male'
                />
              </div>
            </div>
          </div>
          <div class="cv__section_item">
            <label>опыт работы: </label>
            <div class="cv__radio">
              <div class="cv__radio_item">
                <label for="hasExperience">есть опыт</label>
                <input class="cv__input"
                  v-model="cv.hasExperience"
                  :value='true'
                  type="radio"
                  id='hasExperience'
                />
              </div>
              <div class="cv__radio_item">
                <label for="noExperience">нет опыта</label>
                <input class="cv__input"
                  v-model="cv.hasExperience"
                  :value='false'
                  type="radio"
                  id='noExperience'
                />
              </div>
            </div>
          </div>
        </section>
        <section class="cv__section" v-if="cv.hasExperience">
          <h3>Опыт работы</h3>
          <div  v-if="!cv.experience.length" class="cv__section_item">
            <span>1 </span>
            <textarea v-model.lazy="cv.experience[0]" class="cv__textarea"
            placeholder="место работы, должность, обязанности"/>
          </div>
          <div  v-for="(exp, index) in cv.experience" :key="index" class="cv__section_item">
            <span>{{ index + 1 }} </span>
            <textarea v-model.lazy="cv.experience[index]" class="cv__textarea"
            placeholder="место работы, должность, обязанности"/>
          </div>
          <button class="cv__button" @click="add('experience')">
            добавить
          </button>
        </section>
        <section class="cv__section">
          <h3>Специальность</h3>
          <p>
            <label>желаемая должность: </label>
            <input v-model="cv.profession" class="profile__data" type="text"/>
          </p>
          <p>
            <label>зарплата: </label>
            <input v-model="cv.salary" class="profile__data" type="text"/>
          </p>
        </section>
        <section class="cv__section">
          <h3>Образование</h3>
          <div  v-if="!cv.education.length" class="cv__section_item">
            <span>1 </span>
            <textarea v-model.lazy="cv.education[0]" class="cv__textarea"
            placeholder="учебное заведение, специальность"/>
          </div>
          <div  v-for="(edu, index) in cv.education" :key="index" class="cv__section_item">
            <span>{{ index + 1 }} </span>
            <textarea v-model.lazy="cv.education[index]" class="cv__textarea"
            placeholder="учебное заведение, специальность"/>
          </div>
          <button class="cv__button" @click="add('education')">
            добавить
          </button>
        </section>
        <section class="cv__section">
          <h3>Дополнительная информация</h3>
          <textarea v-model="cv.additionally" class="cv__textarea"
          placeholder="напишите о себе"/>
        </section>
        <div class="cv__success" :class="{ show: showSuccess }">ваше резюме сохранено</div>
        <button class="cv__button_save" @click="save">
          сохранить
        </button>
        <button v-if="curCV" class="cv__button_save" @click="generateReport">
          скачать pdf
        </button>
      </div>
    </main>
    <Footer />
    <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        :filename="'cv_' + user.login"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="portrait"
        pdf-content-width="800px"
        ref="cv2pdf"
      >
        <section slot="pdf-content" class="pdf-content">
          <section class="pdf-header">
            <img v-if="user.photo_url" :src="user.photo_url" alt="user_photo" class="pdf-img">
            <div class="pdf-profession">
              <div v-if="cv.profession">{{ cv.profession }}</div>
              <div v-if="cv.salary">{{ cv.salary }}</div>
            </div>
          </section>
          <section class="pdf-item">
            <h4 class="pdf-title">Контактные данные</h4>
            <ul>
              <li v-if="cv.first_name">
                имя: <span>{{ cv.first_name }}</span>
              </li>
              <li v-if="cv.last_name">
                фамилия: <span>{{ cv.last_name }}</span>
              </li>
              <li v-if="cv.phone">
                телефон: <span>{{ cv.phone }}</span>
              </li>
              <li v-if="cv.email">
                e-mail: <span>{{ cv.email }}</span>
              </li>
              <li v-if="cv.city">
                город: <span>{{ cv.city }}</span>
              </li>
              <li v-if="cv.address">
                адрес: <span>{{ cv.address }}</span>
              </li>
            </ul>
          </section>
          <hr class="pdf-hr"/>
          <section v-if="cv.birthday || cv.gender" class="pdf-item">
            <h4 class="pdf-title">Основная информация</h4>
            <ul>
              <li v-if="cv.birthday">
                дата рождения: <span>{{ cv.birthday }}</span>
              </li>
              <li v-if="cv.gender">
                пол: <span>{{ cv.gender == 'Ж' ? 'женский' : 'мужской' }}</span>
              </li>
            </ul>
          </section>
          <hr class="pdf-hr"/>
          <section v-if="cv.hasExperience" class="pdf-item">
            <h4 class="pdf-title">Опыт работы</h4>
            <ol>
              <li  v-for="(exp, index) in cv.experience" :key="index" >
                {{ exp }}
              </li>
            </ol>
          </section>
          <hr class="pdf-hr"/>
          <section v-if="cv.education.length" class="pdf-item">
            <h4 class="pdf-title">Образование</h4>
            <ol>
              <li  v-for="(edu, index) in cv.education" :key="index" >
                {{ edu }}
              </li>
            </ol>
          </section>
          <hr class="pdf-hr"/>
          <section v-if="cv.additionally" class="pdf-item">
            <h4 class="pdf-title">Дополнительная информация</h4>
            <div>
              {{ cv.additionally }}
            </div>
          </section>
        </section>
      </vue-html2pdf>
  </div>
</template>

<script>

import Header from "@components/Header.vue";
import Footer from "@components/Footer.vue";
import VueHtml2pdf from 'vue-html2pdf';
import { mapGetters } from "vuex";

export default {
  name: "CV",
  components: { Header, Footer, VueHtml2pdf },
  data() {
    return {
      cv: {
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        city: '',
        birthday: '',
        gender: '',
        address: '',
        profession: '',
        salary: '',
        hasExperience: false,
        experience: [],
        education: [],
        additionally: ''
      },
      showSuccess: false
    }
  },
  mounted() {
    const currentCV = this.curCV ? this.curCV : this.user;
    Object.keys(currentCV).forEach((key) => {
      if (currentCV[key] !== null && key in this.cv) {
        this.cv[key] = currentCV[key];
      }
    })
    this.cv.birthday = this.cv.birthday.substring(0, 10);
  },
  methods: {
    add(param) {
      if (this.cv[param][0] && this.cv[param][this.cv[param].length - 1])
      {
        this.cv[param].push('');
      }
    },
    async save() {
      if (!this.cv.hasExperience) {
        this.cv.experience = [];
      }
      const res = await this.$store.dispatch("updateUser", { id: this.user.id, newParam: { cv: JSON.stringify(this.cv) }});
      if (res) {
        this.showSuccess = true;
        setTimeout( () => this.showSuccess = false, 2000 );
      }
    },
    generateReport () {
        this.$refs.cv2pdf.generatePdf();
    }
  },
  computed: {
    ...mapGetters({ user: "user_getter" }),
    curCV: function () {
      if  (!this.user.cv) {
        return null;
      }
      return typeof(this.user.cv) == 'string' ? JSON.parse(this.user.cv) : this.user.cv;
    }
  },
};
</script>

<style >
.cv__title {
  font-family: "montserrat", "arial", sans-serif;
  text-align: center;
  padding: 10px;
  margin-top: 30px;
  color: #555555;
}

.cv__content {
  font-family: "montserrat", "arial", sans-serif;
  color: #8c8c8c;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;
  padding: 20px 0;
}

.cv__content p {
  display: flex;
  justify-content: space-between;
  align-self: center;
  margin-bottom: 10px;
}

.profile__data {
  font-weight: 400;
  color: #555555;
}

.cv__button {
  width: 100px;
  padding: 5px 10px;
  margin-top: 20px;
  border: 0;
  border: 1px solid #0088ad;
  border-radius: 5px;
  color: #0088ad;
  background-color: #fbfaf8;
  font-family: "raleway", "arial", sans-serif;
  font-size: 12px;
  font-weight: 400;
  font-style: normal;
  text-align: center;
  align-self: center;
}

.cv__button:hover {
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

.cv__section {
  align-self: center;
  width: 600px;
  margin: 20px 0;
  padding: 20px;
  background-color: #fbfaf8;
}

.cv__section h3{
  margin-bottom: 20px;
  font-size: 16px;
  color: #0088ad;
}

.cv__textarea {
  font-family: "montserrat", "arial", sans-serif;
  width: 100%;
  border: 1px solid #c7b299;
  border-radius: 3px;
  padding: 5px;
}

.cv__section input{
  border: 1px solid #c7b299;
  border-radius: 3px;
  padding: 5px;
  width: 50%;
}

.cv__section_item {
  display: flex;
  justify-content: space-between;
  align-self: center;
  margin: 30px 0;
}

.cv__section_item span {
  margin-right: 10px;
}

.cv__radio {
  display: flex;
  width: 50%;
}

.cv__radio_item {
  margin-right: 30px;
  font-size: 16px;
}

.cv__button_save{
    padding: 10px;
    background: #555555;
    color: #fff;
    outline: none;
    border: none;
    margin: 10px 0;
    width: 210px;
    align-self: center;
  }

.cv__button_save:hover{
    cursor: pointer;
    background: #c7b299;
    border-color: #c7b299;
    transition: 2s;
}

.cv__success {
  align-self: center;
  color: #0088ad;
  visibility: hidden;
}

.show {
  visibility: visible;
}

.pdf-title {
  font-family: "montserrat", "arial", sans-serif;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #555555;
}

.pdf-content {
  font-family: "montserrat", "arial", sans-serif;
  width: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;
  padding: 20px 0;
}

.pdf-item {
  width: 600px;
  display: flex;
  flex-direction: column;
  align-self: center;
  margin-bottom: 30px;
}

.pdf-item li {
  display: flex;
  justify-content: space-between;
  align-self: center;
  margin-bottom: 10px;
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

.pdf-hr {
  color: #e2e1e1;
  width: 50%;
  align-self: center;
}

.pdf-img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  object-position: center center;
  border: 1px solid #e2e1e1;
  border-radius: 5px;
  align-self: center;
  margin: 5px 5px 20px 5px;
}

.pdf-header {
  width: 600px;
  display: flex;
  justify-content: space-between;
  align-self: center;
}

.pdf-profession {
  font-weight: 600;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>