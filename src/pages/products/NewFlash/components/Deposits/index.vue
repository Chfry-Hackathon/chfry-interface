<template>
  <list-container :isLoading="depositsLoading" size="sm" :styled="styled">
    <div class="m-deposits-content">
      <MobileTableList v-if="isMobile" size="sm" :dataSource="depositsData" :columns="columns">
        <span slot="deposits" slot-scope="{ data }" class="deposits">
          <img :src="data.url" :alt="data.url" />
          <span>{{ data.deposits }}</span>
        </span>
        <span slot="balance" slot-scope="{ data }" class="balance">
          <span class="amount">
            <Tooltip
              :data="data.amount < 0.01 ? '<0.01' : data.amount"
              :detail="data.amountDetail"
            ></Tooltip>
          </span>
          <span class="estimated-money">
            <Tooltip :data="data.value" :detail="data.valueDetail"></Tooltip>
          </span>
        </span>
        <span slot="apy" slot-scope="{ data }" class="apy">
          <span class="number">
            <Tooltip :data="data.apy" :detail="data.apyDetail"></Tooltip>
          </span>
          <span class="apr">
            <Tooltip :data="data.apr" :detail="data.aprDetail"></Tooltip>
            APR
          </span>
        </span>
      </MobileTableList>

      <Table v-else :dataSource="depositsData" :columns="columnsData" :pagination="pagination">
        <span slot="deposits" slot-scope="list, data" class="deposits">
          <!-- {{list}} -->
          <img :src="data.url" :alt="data.url" />
          <span>{{ data.deposits }}</span>
        </span>
        <span slot="balance" slot-scope="list, data" class="balance">
          <span class="amount">
            <Tooltip
              :data="data.amount < 0.01 ? '<0.01' : data.amount"
              :detail="fixD(data.amountDetail, 5)"
            ></Tooltip>
          </span>
          <span class="estimated-money">
            <Tooltip :data="data.value" :detail="data.valueDetail"></Tooltip>
          </span>
        </span>
        <span slot="apy" slot-scope="list, data" class="apy">
          <span class="number">
            <Tooltip :data="data.apy" :detail="data.apyDetail"></Tooltip>
          </span>
          <span class="apr">
            <div class="apr-content">
              <img
                :src="'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iR3JvdXAgMjcwMjEiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJhIiB4MT0iLjkwNyIgeDI9Ii4xNjMiIHkxPSIuMjI3IiB5Mj0iLjg1MyIgZ3JhZGllbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2I2NTA5ZSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzJlYmFjNiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEyIiBmaWxsPSJ1cmwoI2EpIiBkYXRhLW5hbWU9IkVsbGlwc2UgOTkxIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTE3LjI1MSAxNi43OGwtNC4wNTktOS44MDlhMS4wOTEgMS4wOTEgMCAwMC0xLjAxNy0uNzU1aC0uMzU5YTEuMDkxIDEuMDkxIDAgMDAtMS4wMTcuNzU1bC0xLjc2NiA0LjI3NEg3LjY5N2EuNzMxLjczMSAwIDAwLS43MjguNzI1di4wMWEuNzMxLjczMSAwIDAwLjcyOC43MjVoLjcxOEw2LjczIDE2Ljc4YS44Ni44NiAwIDAwLS4wNS4yNzguNzY3Ljc2NyAwIDAwLjIuNTQ3LjcuNyAwIDAwLjUzOS4yMDkuNzI5LjcyOSAwIDAwLjQxOS0uMTM5Ljg4NS44ODUgMCAwMC4yODktLjM2OGwxLjg1My00LjYwMWgxLjI4N2EuNzMxLjczMSAwIDAwLjcyOC0uNzI1di0uMDJhLjczMS43MzEgMCAwMC0uNzI4LS43MjVoLS42ODdsMS40MTUtMy41MjkgMy44NTkgOS42YS44ODUuODg1IDAgMDAuMjg5LjM2OC43MjkuNzI5IDAgMDAuNDE5LjEzOS43LjcgMCAwMC41MzktLjIwOS43NjcuNzY3IDAgMDAuMi0uNTQ3LjY1Ny42NTcgMCAwMC0uMDUtLjI3OHoiIGRhdGEtbmFtZT0iUGF0aCAyNDM0Ii8+PC9zdmc+'"
                alt=""
              />
              <Tooltip :data="data.apr" :detail="data.aprDetail"></Tooltip>
              <span class="name">APR</span>
            </div>
          </span>
        </span>
        <span slot="action" slot-scope="data">
          <div class="m-chfry-withdraw-btn" @click="handleWithDraw(data)">WITHDRAW</div>
        </span>
      </Table>
    </div>
  </list-container>
</template>

<script>
import ListContainer from "../common/ListContainer";
import Table from "../common/Table";
import { mapGetters } from "vuex";
import MobileTableList from "../common/MobileTableList";
import Tooltip from "../common/Tooltip";
import {
  GETDEPOSITSDATA,
  GETBORROWDATA,
  SETEXHIBITDATA,
  GETUSERORDER,
} from "../../../../../store/modules/dsa";
import { fixD } from "../../../../../utils/common-method";
import { withdraw } from "../../../../../DSA/index";

export default {
  name: "chfry-flash-deposits",
  props: {
    styled: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  components: {
    ListContainer,
    MobileTableList,
    Table,
    Tooltip,
  },
  data() {
    return {
      fixD,
      btnLoading: false,
      isLoading: false,
      dataSource: [],
      pagination: {
        defaultPageSize: 8,
        hideOnSinglePage: true,
      },
      columns: [
        {
          title: "DEPOSITS",
          dataIndex: "deposits",
          key: "deposits",
          align: "left",
          scopedSlots: { customRender: "deposits" },
          mStyle: {
            width: "114px",
            textAlign: "left",
          },
        },
        {
          title: "CURRENT BALANCE",
          dataIndex: "balance",
          key: "balance",
          align: "center",
          scopedSlots: { customRender: "balance" },
          mStyle: {
            width: "80px",
            textAlign: "left",
          },
        },
        {
          title: "APY",
          dataIndex: "apy",
          key: "apy",
          scopedSlots: { customRender: "apy" },
          align: "center",
          mStyle: {
            width: "80px",
            textAlign: "right",
          },
        },
        // {
        //   title: "WITHDRAW",
        //   key: "action",
        //   scopedSlots: { customRender: "action" },
        //   align: "center",
        //   mStyle: {
        //     flex: 1,
        //     textAlign: "left",
        //   },
        //   fixed: "right",
        // },
      ],
    };
  },
  watch: {
    initialSuccess(v) {
      if (v) {
        this.$store.dispatch(`dsa/${GETDEPOSITSDATA}`, this.currentPositionType);
      }
    },
    currentPositionType(v) {
      this.$store.dispatch(`dsa/${GETDEPOSITSDATA}`, this.currentPositionType);
    },
  },
  computed: {
    ...mapGetters([
      "isLogin",
      "isMobile",
      "initialSuccess",
      "depositsLoading",
      "depositsData",
      "currentPositionType",
      "order",
      "orderDataSources",
      "repayAndWithdrawLimit",
    ]),
    columnsData() {
      if (this.depositsData && this.depositsData.length > 0 && this.orderDataSources.length < 1) {
        // const isCostMoreOne = this.depositsData.some((item) => Number(item.initialValue) > this.repayAndWithdrawLimit);
        // if (isCostMoreOne) {
        let arr = JSON.parse(JSON.stringify(this.columns));
        arr.push({
          title: "WITHDRAW",
          key: "action",
          scopedSlots: { customRender: "action" },
          align: "center",
          mStyle: {
            flex: 1,
            textAlign: "left",
          },
          fixed: "right",
        });
        return arr;
        // }
        // return this.columns;
      }
      return this.columns;
    },
  },
  methods: {
    updateOrder() {
      this.$store.dispatch(`dsa/${GETDEPOSITSDATA}`, this.currentPositionType);
      this.$store.dispatch(`dsa/${GETBORROWDATA}`, this.currentPositionType);
      this.$store.dispatch(`dsa/${GETUSERORDER}`, {
        account: this.dsaAccount,
        isSleep: true,
      });
      this.$store.dispatch(`dsa/${SETEXHIBITDATA}`);
    },
    handleWithDraw(v) {
      withdraw({
        collateralToken: v.token,
        onConfirmation: (confirmationNumber) => {
          if (confirmationNumber === 1) {
            this.btnLoading = false;
            this.updateOrder();
          }
        },
        onError: (error) => {
          console.log(error);
          this.btnLoading = false;
        },
      });
    },
  },
  mounted() {
    if (this.initialSuccess) {
      this.$store.dispatch(`dsa/${GETDEPOSITSDATA}`, this.currentPositionType);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
@import "./index.h5.scss";
</style>
