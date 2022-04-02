<template>
  <section class="m-chfry-flash-cart-wrapper">
    <div
      v-for="(item, index) in transformData"
      :key="index"
      class="m-chfry-flash-cart-list"
      :style="{ marginTop: index !== 0 ? '32px' : '' }"
    >
      <Card
        :isLoading="exhibitLoding"
        v-for="(ite, ind) in item"
        :key="ind"
        :item="ite"
        :styled="{ marginLeft: ind !== 0 ? '24px' : '' }"
      >
        <template v-slot:title> {{ ite.title }} </template>
        <template v-slot:popover v-if="ite.popover">
          <div v-for="(itemText, textInex) in ite.popoverText" :key="textInex">
            {{ itemText.text }}
          </div>
        </template>
        <template v-slot:number>
          <Tooltip
            :styled="setStyle(ite)"
            :data="ite.number > 10000 ? '> 10000' : ite.amountThousands"
            :detail="fixD(ite.amount, 5)"
          ></Tooltip>
        </template>
      </Card>
    </div>
  </section>
</template>

<script>
import Card from "../common/Card";
import { arrTrans } from "../../../../../utils/arrTrans";
import { mapGetters } from "vuex";
import Tooltip from "../common/Tooltip";
import { data } from "./cardData";
import { SETEXHIBITDATA } from "../../../../../store/modules/dsa";
import { calcColor, setColor } from "../../../../../utils/colorHelper";
import { fixD } from "../../../../../utils/common-method";

export default {
  data() {
    return {
      fixD,
      isLoading: false,
      isTransData: false,
      cardData: data,
    };
  },
  components: {
    Card,
    Tooltip,
  },
  watch: {
    initialSuccess(v) {
      if (v) {
        this.$store.dispatch(`dsa/${SETEXHIBITDATA}`);
      }
    },
    exhibitData(v) {
      if (v && v.length > 0) {
        this.cardData = v;
      } else {
        this.cardData = data;
      }
    },
  },
  computed: {
    ...mapGetters(["isLogin", "isMobile", "initialSuccess", "exhibitData", "exhibitLoding"]),
    transformData() {
      const n = this.isMobile || this.isTransData ? 2 : 3;
      const data = arrTrans(this.cardData, n);
      return data;
    },
  },
  methods: {
    setStyle(item) {
      if (item.sort === 3) {
        return {
          color: setColor(item.amountThousands),
        };
      }
      return {};
    },
    resize() {
      let screenWidth = document.body.clientWidth;
      let isTrans = screenWidth <= 1120;
      this.isTransData = isTrans;
      window.onresize = () => {
        return (() => {
          screenWidth = document.body.clientWidth;
          isTrans = screenWidth <= 1120;
          this.isTransData = isTrans;
        })();
      };
    },
  },
  mounted() {
    this.resize();
    if (this.initialSuccess) {
      this.$store.dispatch(`dsa/${SETEXHIBITDATA}`);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
@import "./index.h5.scss";
</style>
