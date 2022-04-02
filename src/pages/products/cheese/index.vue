<template>
    <div class="cheese-page">
        <div class="chr-title">
            <div class="t1">
                <span class="t1-span1">CHEESE FACTORY</span>
                <span class="t1-span2">CHEESE FACTORY</span>
            </div>
            <div class="t2">From Farm to Table: Upsize your <br v-if="isMobile">earnings and top up
                <br v-if="!isMobile">those cheese <br v-if="isMobile">tokens via staking
            </div>
        </div>
        <!-- <staking-bonus /> -->

        <template v-if="pools&&pools.length>0">
            <div class="pools" v-for="(items,index) in pools" :key="index">
                <template v-if="!isMobile">
                    <new-cheese-item 
                        v-for="(item,indx) in items"
                        :key="indx"
                        :styled="setSeyled(indx, index)"
                        :onSelect="onSelect" :pool="item"
                    />
                </template>
                <template v-else>
                    <cheese-item v-for="(item,index) in items" :key="index" :onSelect="onSelect" :pool="item"></cheese-item>
                </template>
                
            </div>
        </template>
        <div class="m-retired-container">
            <div class="m-retired-content">
                <div class="m-retired-title">RETIRED POOLS</div>
                <div class="m-retired-desc">Migrate your liquidity now!</div>
            </div>
        </div>
         <template v-if="retiredPools&&retiredPools.length>0">
            <div class="pools" v-for="(items,index) in retiredPools" :key="index">
                <template v-if="!isMobile">
                    <new-cheese-item 
                        v-for="(item,indx) in items"
                        :key="indx"
                        :styled="setSeyled(indx, index)"
                        :onSelect="onSelect" :pool="item"
                    />
                </template>
                <template v-else>
                    <cheese-item v-for="(item,index) in items" :key="index" :onSelect="onSelect" :pool="item"></cheese-item>
                </template>
                
            </div>
        </template>
        <div v-if="loading" style="margin:32px auto 64px;text-align: center;min-height: 60vh;">
            <!-- <a-spin size="large"/> -->
           <loading-rows>
                <div v-for="(items,index) in 20" :key="index"></div>
            </loading-rows>
        </div>
    </div>
</template>


<script>
    import {mapGetters} from "vuex";
    import CheeseItem from "./components/CheeseItem"
    import { trace} from "../../../utils/tools";
    // import {getStakePools} from "../../../sdk/cheese-sdk";
    // import {getStakePools,getCheesePools} from "../../../utils/infuraWeb3";
    import {memory} from "../../../utils/cache";
    // import Global from "../../../common/Global"
    import LoadingRows from '../../../components/LoadingRows.vue'
    import { CHEESE_FACTORY_CACHE_KEY } from '../../../constant/index'
    import { is_Mobile } from '../../../utils/is'
    import NewCheeseItem from './components/newCheeseItem/NewCheeseItem.vue'
    import { getStakePools, getCheesePools } from "../../../utils/multicall";

    export default {
        components: {CheeseItem,LoadingRows,NewCheeseItem},
        props: {},
        data() {
            return {
                loading: false,
                pools: [],
                retiredPools:[],
            };
        },
        methods: {
            cur_is_mobile() {
                return is_Mobile()
            },
            setSeyled(indx,index) {
                if(!this.isMobile) {
                    return {
                        [ indx !== 0  ? 'marginLeft':""]: '126px',
                        [(index > 0) ? 'marginTop' : '']: "40px",
                    }
                }
                return {}
            },
            onSelect(pool) {
                if (this.isLogin) {
                    trace("onSelect-pool=",JSON.stringify(pool))
                    this.$store.dispatch("user/setCheese",pool);
                    this.$router.push({path: "/cheese/stake"})
                }
                else {
                    this.$bus.emit("showLogin",true);
                }
            },

            async checkInfo() {
                    this.loading = true;
                    const statusCache = memory.get(CHEESE_FACTORY_CACHE_KEY);
                    let res = {};
                    if(statusCache && statusCache.value && statusCache.value.data) {
                        res = statusCache.value
                    } else {
                        const result = await getStakePools()
                        memory.set(CHEESE_FACTORY_CACHE_KEY , result)
                        res = result
                    }
                    // let res = await getStakePools();
                    this.$store.dispatch("user/setPools", res.data);
                    this.pools = [];
                    this.retiredPools = [];
                    let arr = [];
                    let retiredArr = [];
                    let bb = 3;
                    if(this.isMobile){
                        bb = 2
                    }
                    res.data.map(item => {
                        // item.apr = item.weight;
                        let aa = getCheesePools(item.token)
                        if(aa){
                          item.symbol1 = aa.icon2;
                          item.icon = aa.icon
                          item.symbol = aa.symbol;
                          if (arr.length >= bb) {
                            this.pools.push(arr);
                            arr = [];
                          }
                          if (retiredArr.length >= bb) {
                            this.retiredPools.push(retiredArr)
                            retiredArr = []
                          }
                          let mapsText = {
                              'fUSD 3CRV':'POOL LINK',
                              'fUSD':'GET TOKENS',
                              'CheeseEthLP':'POOL LINK',
                              'CHEESE TOKEN':'GET TOKENS',
                              'ALUSD':'GET TOKENS',
                              'MIM TOKEN':'GET TOKENS'
                          }
                          let mapsUrl= {
                              'fUSD 3CRV':'https://curve.fi/factory/45/deposit',
                              'fUSD':'https://curve.fi/factory/45',
                              'CheeseEthLP':'https://app.sushi.com/add/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/0x332E824e46FcEeB9E59ba9491B80d3e6d42B0B59',
                              'CHEESE TOKEN':'https://app.sushi.com/swap?inputCurrency=0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2&outputCurrency=0x332E824e46FcEeB9E59ba9491B80d3e6d42B0B59',
                              'ALUSD':'https://curve.fi/alusd',
                              'MIM TOKEN':'https://curve.fi/mim'
                          }
                          const retiredList = ['fUSD', 'ALUSD', 'MIM TOKEN'];
                          const isRetired = retiredList.includes(item.symbol)

                          let obj = Object.assign({},item, {
                              text: mapsText[item.symbol],
                              url: mapsUrl[item.symbol],
                              isRetired:isRetired,
                          })
                          if(!isRetired) {
                            arr.push(obj);
                          }else {
                            retiredArr.push(obj)
                          }
                        }
                    })
                    if(arr.length>0) this.pools.push(arr);
                    if(retiredArr.length>0) this.retiredPools.push(retiredArr);
                    this.loading = false;
                    trace("pools", this.pools)
            }
        },
        watch: {
            // account() {
            //     this.checkInfo();
            // },
            // config() {
            //     this.checkInfo();
            // },

        },
        computed: {
            ...mapGetters(["account", "isLogin","config","isMobile"])
        },

        mounted() {
            this.checkInfo();
        },
    };
</script>
<style lang="scss" scoped>
    @import "./index_375.scss";
    @import "./index_1024.scss";
    @import "./index_1280.scss";
    @import "./index_1440.scss";


</style>

