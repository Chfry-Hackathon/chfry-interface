<template>
  <section class="layout-content-page" style="  min-height: calc(100vh - 152px);">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {
    key() {
      return this.$route.path;
    },
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>

</style>
