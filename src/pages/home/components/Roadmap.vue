<style lang="scss" scope>
@media screen and (max-width: 750px) {
  .m-roadmap-container {
    width: 100%;
    /* padding-top: 50px; */
    .m-roadmap-content {
      width: 100%;
      .m-roadmap-title {
        display: inline-block;
        width: 100%;
        height: 131px;
        line-height: 131px;
        font-family: Bugaki;
        font-style: normal;
        font-weight: normal;
        font-size: 20px;
        text-align: center;

        color: #171717;
      }
      .m-roadmap-main {
        width: 100%;
      }
    }
  }
}
@media screen and (max-width: 1279px) and (min-width: 751px) {
  .m-roadmap-container {
    width: 100%;
    /* padding-top: 50px; */
    .m-roadmap-content {
      width: 100%;
      .m-roadmap-title {
        display: inline-block;
        width: 100%;
        height: 153px;
        line-height: 153px;
        font-family: Bugaki;
        font-style: normal;
        font-weight: normal;
        font-size: 32px;
        text-align: center;
        color: #171717;
      }
      .m-roadmap-main {
        width: 100%;
      }
    }
  }
}
@media screen and (max-width: 1439px) and (min-width: 1280px) {
  .m-roadmap-container {
    width: 100%;
    /* padding-top: 50px; */
    .m-roadmap-content {
      width: 100%;
      .m-roadmap-title {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        height: 153px;
        line-height: 153px;
        font-family: Bugaki;
        font-style: normal;
        font-weight: normal;
        font-size: 32px;
        text-align: center;
        color: #171717;
      }
      .m-roadmap-main {
        width: 100%;
      }
    }
  }
}
@media screen and (min-width: 1440px) {
  .m-roadmap-container {
    width: 100%;
    /* padding-top: 50px; */
    .m-roadmap-content {
      width: 100%;
      .m-roadmap-title {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        height: 153px;
        line-height: 153px;
        font-family: Bugaki;
        font-style: normal;
        font-weight: normal;
        font-size: 32px;
        text-align: center;
        color: #171717;
      }
      .m-roadmap-main {
        width: 100%;
      }
    }
  }
}
@media screen and (min-width: 1440px) {
  .m-roadmap-container {
    width: 100%;
    /* padding-top: 50px; */
    .m-roadmap-content {
      width: 100%;
      .m-roadmap-title {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        height: 153px;
        line-height: 153px;
        font-family: Bugaki;
        font-style: normal;
        font-weight: normal;
        font-size: 32px;
        text-align: center;
        color: #171717;
      }
      .m-roadmap-main {
        width: 100%;
      }
    }
  }
}
</style>
<template>
  <div class="m-roadmap-container">
    <div class="m-roadmap-content">
      <title class="m-roadmap-title">Roadmap</title>
      <main class="m-roadmap-main" v-if="isMobile">
        <chfry-line-h5 :dataList="dataList"></chfry-line-h5>
      </main>
      <main class="m-roadmap-main" v-else>
        <chfry-line-pc :dataList="dataList"></chfry-line-pc>
      </main>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ChfryLineH5 from "./ChfryLine.vue";
import ChfryLinePc from "./ChfryLinePc.vue";

export default {
  components: {
    ChfryLineH5,
    ChfryLinePc,
  },
  props: {
    dataList: {
      type: Array,
      default: [],
    },
  },
  computed: {
    ...mapGetters(["isLogin", "isMobile"]),
  },
};
</script>
