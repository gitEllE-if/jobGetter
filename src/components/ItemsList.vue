<template>
  <div class="vacancies-block">
    <vue-topprogress ref="topProgress" color="#00b0e0"></vue-topprogress>
    <Item
      :type="type"
      v-for="(item, index) of itemsList"
      :key="item.id"
      :item="item"
      :idx="index"
      @del="delItem"
      @pin="pinItem"
    />
  </div>
</template>

<script>
import Item from "@components/Item.vue";
import { vueTopprogress } from "vue-top-progress";
import { mapGetters } from "vuex";
import { eventBus } from "@plugins/EventBus";

export default {
  name: "ItemsList",
  components: { Item, vueTopprogress },
  props: {
    type: {
      type: String,
      default: "small",
    },
    sortedItems: {
      type: Array,
      default: null,
    },
    favorites: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  mounted() {
    eventBus.$on("beforeRequest", this.topProgressStart);
    eventBus.$on("requestError", this.topProgressFail);
    eventBus.$on("afterResponse", this.topProgressDone);
    eventBus.$on("responseError", this.topProgressFail);
  },
  beforeDestroy() {
    eventBus.$off("beforeRequest", this.topProgressStart);
    eventBus.$off("requestError", this.topProgressFail);
    eventBus.$off("afterResponse", this.topProgressDone);
    eventBus.$off("responseError", this.topProgressFail);
  },
  methods: {
    async delItem(id) {
      try {
        await this.$store.dispatch("delVacancy", id);
      } catch (err) {
        console.log(err);
      }
      if (this.favorites) {
        location.reload();
      }
    },
    async pinItem(id, pinned) {
      try {
        await this.$store.dispatch("pinVacancy", { id, pinned });
      } catch (err) {
        console.log(err);
      }
      if (this.favorites) {
        location.reload();
      }
    },
    topProgressStart() {
      this.$refs.topProgress.start();
    },
    topProgressDone() {
      this.$refs.topProgress.done();
    },
    topProgressFail() {
      this.$refs.topProgress.fail();
    },
  },
  computed: {
    ...mapGetters({ items: "vacancies_getter" }),
    itemsList: function () {
      return this.sortedItems ? this.sortedItems : this.items;
    },
  },
};
</script>

<style >
</style>
