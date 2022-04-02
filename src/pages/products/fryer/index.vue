<template>
    <div class="page-baskets">
        <div class="chr-title">
            <div class="t1">
                <span class="t1-span1">FRYER</span>
                <span class="t1-span2">FRYER</span>
            </div>
            <div class="t2">Stake your tokens in a frying basket <br v-if="isMobile">and get fUSD</div>
        </div>
        <div class="p1">
            <img src="../../../assets/fryer_img.svg"/>
        </div>
        <div class="pool-con">
            <pool-item v-for="(item,index) in pools" :key="item.symbol" :toDeposit="toDeposit" :token="item"></pool-item>
        </div>


    </div>
</template>

<script>
    import PoolItem from "../../../components/PoolItem"
    import { mapGetters } from "vuex";
    import fryerData from './fryerData.vue'
    export default {
        components: {PoolItem},
        mixins:[fryerData],
        watch: {
            account() {
                this.fryerCheckInfo();
            },
            config() {
                this.fryerCheckInfo();
            },
        },
        computed: {
            ...mapGetters(["account", "isLogin", "config", "isMobile"]),
        },

        mounted() {
            this.fryerCheckInfo();
        },
    };
</script>
<style lang="scss" scoped>

  @import "./index_375.scss";
  @import "./index_1024.scss";
  @import "./index_1280.scss";
  @import "./index_1440.scss";


</style>

