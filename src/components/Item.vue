<template>
  <div v-frag>
    <template v-if="type == 'small'">
      <div class="vacancy" :class="{ pinned: item.pinned }">
        <div class="vacancy-block-logo">
          <img
            class="vacancy-logo"
            :src="`${item.logo_url ? item.logo_url : ''}`"
            alt=""
          />
          <div class="vacancy-provider">
            {{ item.provider }}
          </div>
        </div>
        <div class="vacancy-block-text">
          <div class="vacancy-name">
            <router-link
              :to="{ name: 'Vacancy', params: { id: item.origin_id } }"
            >
              {{ item.name }}
            </router-link>
          </div>
          <div class="vacancy-area" v-if="item.area">
            {{ item.area }}
          </div>
          <div class="vacancy-salary">
            {{ salary }} <span>{{ currency }}</span>
          </div>
        </div>
        <div class="vacancy-block-icon">
          <font-awesome-icon
            :icon="delIcon"
            class="vacancy-icon"
            @click.prevent="$emit('del', item.origin_id)"
          />
          <font-awesome-icon
            :icon="pinIcon"
            class="vacancy-icon"
            @click.prevent="$emit('pin', item.origin_id, !item.pinned)"
          />
        </div>
      </div>
    </template>

    <template v-if="type == 'large'">
      <div class="vacancy-large" :class="{ pinned: item.pinned }">
        <div class="vacancy-block-logo">
          <img
            class="vacancy-logo"
            :src="`${item.logo_url ? item.logo_url : ''}`"
            alt=""
          />
          <div class="vacancy-provider">
            {{ item.provider }}
          </div>
        </div>
        <div class="vacancy-block-text">
          <div class="vacancy-name-large">
            <router-link
              :to="{ name: 'Vacancy', params: { id: item.origin_id } }"
            >
              {{ item.name }}
            </router-link>
            <div class="vacancy-label">
              <div class="vacancy-label-item" v-if="item.remote">удаленно</div>
              <div
                class="vacancy-label-item noexperience"
                v-if="item.no_experience"
              >
                без опыта
              </div>
            </div>
          </div>
          <div class="vacancy-employer-name" v-if="item.employer_name">
            {{ item.employer_name }}
          </div>
          <div class="vacancy-area-time">
            <div class="vacancy-area-large" v-if="item.area">
              {{ item.area }}
            </div>
            <div class="vacancy-time" v-if="item.published_at">
              {{ item.published_at.substring(0, 10) }}
            </div>
          </div>
          <div class="vacancy-requirement" v-if="item.requirement">
            <span
              ><font-awesome-icon :icon="angleIcon" class="vacancy-icon-text" />
            </span>
            {{ item.requirement.substring(0, 255) }}
          </div>
          <div class="vacancy-responsibility" v-if="item.responsibility">
            <span
              ><font-awesome-icon :icon="angleIcon" class="vacancy-icon-text" />
            </span>
            {{ item.responsibility }}
          </div>
          <div class="vacancy-bottom">
            <div class="vacancy-salary">
              {{ salary }} <span>{{ currency }}</span>
            </div>
            <a :href="item.url" class="vacancy-url">перейти >></a>
          </div>
        </div>
        <div class="vacancy-block-icon">
          <font-awesome-icon
            :icon="delIcon"
            class="vacancy-icon"
            @click.prevent="$emit('del', item.origin_id)"
          />
          <font-awesome-icon
            :icon="pinIcon"
            class="vacancy-icon"
            @click.prevent="$emit('pin', item.origin_id, !item.pinned)"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faThumbtack,
  faTimesCircle,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import frag from "vue-frag";

export default {
  directives: {
    frag,
  },
  name: "Item",
  data() {
    return {
      pinIcon: faThumbtack,
      delIcon: faTimesCircle,
      angleIcon: faCaretRight,
    };
  },
  components: { FontAwesomeIcon },
  props: {
    type: {
      type: String,
      default: "small",
    },
    item: { type: Object, default: () => ({}) },
    idx: { type: Number },
  },
  computed: {
    salary: function () {
      let str = "-";
      if (this.item.salary) {
        str = this.item.salary_from ? this.item.salary_from : "";
        str += this.item.salary_from && this.item.salary_to ? "-" : "";
        str += this.item.salary_to ? this.item.salary_to : "";
      }
      return str;
    },
    currency: function () {
      let str = "";
      str +=
        this.item.currency && (this.item.salary_from || this.item.salary_to)
          ? ` ${this.item.currency}`
          : "";
      return str;
    },
  },
};
</script>

<style >
</style>
