<template>
  <div class="vacancies-block">
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
import { mapGetters } from "vuex";

export default {
  name: "ItemsList",
  components: { Item },
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
  async mounted() {
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
  },
  computed: {
    ...mapGetters({ items: "vacancies_getter" }),
    itemsList: function () {
      return this.sortedItems ? this.sortedItems : this.items;
    }
  },
};
</script>

<style >
</style>
