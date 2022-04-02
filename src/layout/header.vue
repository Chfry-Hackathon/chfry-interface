<template>
  <div
    :class="
      isHome
        ? ['layout-header-page', 'page-bg1']
        : ['layout-header-page', 'page-bg2']
    "
  >
    <template v-if="!isMobile">
      <div class="left-icon-box">
        <span style="cursor: pointer" @click="goHome"
          ><img class="btn-img1" src="../assets/logo_text.svg"
        /></span>
      </div>
      <div class="menu-box">
        <div v-if="!global.isClose">
          <a-button
            v-for="(item, index) in navs"
            type="link"
            :class="
              index == curNavId ? 'cheese-nav-btn nav-active' : 'cheese-nav-btn'
            "
            :key="item.path"
            @click="goPage(item)"
            >{{ item.title }}
          </a-button>
        </div>
      </div>
      <div class="chr-flex-center right-pane">
        <!-- <div class="chfry-address">{{currentAddress}}</div> -->
        <span class="chr-flex-center btn-con">
          <template v-if="global.isClose">
            <span></span>
          </template>
          <template>
            <section class="add-wallet-address"  v-if="!global.isClose">
              <a-tooltip>
                <template slot="title">
                    {{fusdText}}
                </template>
                <span
                  @click="handleWalletAddAddress('fusd')"
                  class="add-wallet-address-fusd"
                ><img src="../assets/chfry/fusd.svg" alt="fusd"
              /></span>
            </a-tooltip>

            <a-tooltip>
                <template slot="title">
                    {{cheeseText}}
                </template>
                <span
                  @click="handleWalletAddAddress('cheese')"
                  class="add-wallet-address-cheese"
                ><img src="../assets/chfry/cheese.svg" alt="cheese"
              /></span>
            </a-tooltip>
            </section>
            <span v-if="isLogin">
              <a-popover
                overlayClassName="popover-con"
                placement="bottomRight"
                trigger="hover"
                :visible="hovered"
                @visibleChange="handleClickChange"
              >
                <template slot="content"  v-if="!global.isClose">
                  <div class="p1">
                    <span style="cursor: pointer;" @click="logout">
                      <span class="btn-img img1"
                        ><img src="../assets/tool/tool_icon_back.svg" />
                      </span>
                      <span class="t3">LOGOUT</span>
                    </span>
                    <a @click="hide(false)">
                      <img
                        class="btn-img"
                        style="width: 24px;"
                        src="../assets/tool/tool_icon_close.svg"
                      />
                    </a>
                  </div>

                  <div class="wallet-account-title">Account</div>
                  <div class="p2">
                    <span class="p2-1 ">
                      <img src="../assets/wallet-icon/money.svg" />
                    </span>
                    <span class="p2-2">
                      <span class="p2-2-1">
                        <!--<span v-if="balances&&balances.length>=1">{{balances[0].balance}}</span>-->
                        <template v-if="balances && balances.length >= 1">
                          <a-tooltip
                            style="font-family: Bugaki;font-style: normal;font-weight: normal;font-size: 18px;line-height: 27px;color: #171717;"
                          >
                            <template slot="title">
                              {{ toThousands(balances[0].balance) }}
                            </template>
                            {{ resetString(balances[0].balance) }}
                          </a-tooltip>
                        </template>
                        <span class="p2-2-1-img">
                          <img src="../assets/tool/icon_coin.svg" />
                        </span>
                      </span>
                      <span class="p2-2-2"
                        ><a-button
                          type="link"
                          @click="
                            openWeb(
                              'https://cn.etherscan.com/address/' + account
                            )
                          "
                          >View on Etherscan</a-button
                        ></span
                      >
                    </span>
                  </div>
                  <div class="m-wallet-address">
                    <div class="m-wallet-address-title">Wallet</div>
                    <div class="m-wallet-address-content">
                      <span>{{ currentAddress }}</span>
                    </div>
                  </div>
                </template>

                <a style="margin-right: 1rem;"
                  ><img class="img-btn" src="../assets/tool/tool_icon_jazz.svg"
                /></a>
              </a-popover>
            </span>
            <a-button class="chr-btn chr-btn7 btn" v-else @click="showLogin">
              CONNECT
            </a-button>
          </template>
        </span>
        <span v-if="false">
          <a-dropdown>
            <a-menu slot="overlay" @click="handleMenuClick">
              <a-menu-item key="1">
                <a-icon type="read" />
                Docs
              </a-menu-item>
              <a-menu-item key="2">
                <a-icon type="code" />
                Code
              </a-menu-item>
              <a-menu-item key="3">
                <a-icon type="message" />
                Community
              </a-menu-item>
            </a-menu>
            <a-button
              class="chr-flex-center"
              style="width: 30px;height:30px;background: #D4D4D4;border-radius: 9px;"
            >
              <a-icon type="ellipsis" style="font-size: 18px;" />
            </a-button>
          </a-dropdown>
        </span>
      </div>
    </template>

    <template v-else>
      <div style="line-height: 38px;padding: 0 6px;">
        <a-popover
          overlayClassName="popover-con2"
          trigger="click"
          placement="bottom"
          :visible="showNav"
          @visibleChange="handleClickChangeNav"
        >
          <template slot="content">
            <div class="popover-con2-title">PRODUCTS</div>
            <div
              v-for="(item, index) in navs"
              :key="index"
              style="line-height: 1.4;margin: 7px 0;"
            >
              <a-button
                type="link"
                :key="item.path"
                @click="goPage(item)"
                :class="
                  index == curNavId
                    ? 'cheese-nav-btn nav-active'
                    : 'cheese-nav-btn'
                "
              >
                {{ item.title }}
              </a-button>
            </div>
          </template>
          <a class="btn" style="height: 12px;"
            ><img src="../assets/tool/icon_menu.svg" />
          </a>
        </a-popover>
        <span style="cursor: pointer;margin-left: 12px;" @click="goHome"
          ><img style="height: 12px;" src="../assets/logo_text.svg"
        /></span>
      </div>
    </template>

    <!--<Account v-if="show_account"></Account>-->
  </div>
</template>

<script>
import global from "../common/Global";
import { constantRoutes } from "@/router";
import { mapGetters } from "vuex";
import { resetString, toThousands, trace } from "../utils/tools";
import Account from "../components/account";
import { registerToken } from "../utils/wallet";
import { configRegisterToken } from "../constant/index";

export default {
  components: { Account },
  props: {
    isHome: false,
  },
  data() {
    return {
      fusdText: 'Add FUSD to your MetaMask Wallet',
      cheeseText: 'Add CHEESE to your MetaMask Wallet',
      currentAddress: "",
      global: global,
      toThousands: toThousands,
      resetString: resetString,
      show_account: false,
      isMenu: true,
      hovered: false,
      showNav: false,
      navList: constantRoutes,
      current: ["/"],
      curNavId: -1,

      navs: [
        { title: "FRYER", path: "/fryer", id: 0 },
        { title: "OVEN", path: "/oven", id: 1 },
        { title: "CHEESE FACTORY", path: "/cheese", id: 2 },
        { title: "FLASH FRYER", path: "/flash/long", id: 3 },
      ],
    };
  },
  watch: {
    "$route.path"(newVal, oldVal) {
      trace("route-path=", newVal, oldVal);
      this.initRouterIndex(newVal);
    },
    isLogin(newVal, oldVal) {
      this.currentAddress = newVal ? this.getAccount() : "";
    },
    account(newVal, oldVal) {
      this.currentAddress = newVal ? this.getAccount() : "";
    },
  },
  computed: {
    ...mapGetters(["account", "isLogin", "balances", "isMobile"]),
  },
  methods: {
    handleWalletAddAddress(v) {
      const current = configRegisterToken[v];
      registerToken(current);
    },
    goPage(item) {
      this.hideNav(false);
      this.$router.push({ path: item.path });
    },
    openWeb(path) {
      window.open(path);
    },
    initRouterIndex(path) {
      this.current = [path];
      let obj = this.navs.find((item) => {
        return path.indexOf(item.path) >= 0;
      });
      if (obj) {
        this.curNavId = obj.id;
      } else {
        this.curNavId = -1;
      }
    },
    goHome() {
      this.$router.push({ path: "/" });
    },
    hide(value) {
      this.hovered = value;
    },
    hideNav(value) {
      if (global.isClose) {
        this.showNav = false;
        return;
      }
      this.showNav = value;
    },
    handleClickChange(value) {
      if (global.isClose) {
        this.showNav = false;
        return;
      }

      this.hovered = value;
    },
    handleClickChangeNav(value) {
      if (global.isClose) {
        this.showNav = false;
        return;
      }
      this.showNav = value;
    },
    logout() {
      this.$store.dispatch("user/logout");
    },
    showLogin() {
      if (!this.isLogin) {
        this.$bus.emit("showLogin", true);
      } else {
        this.$bus.emit("showAccount", true);
      }
    },
    getAccount(account) {
      return this.account
        ? this.account.slice(0, 4) + "***" + this.account.slice(-8)
        : null;
    },
    handleMenuClick(e) {
      trace("click", e);
    },
  },
  created() {},
  mounted() {
    this.currentAddress = this.getAccount();
    this.initRouterIndex(this.$route.path);
  },
};
</script>
<style lang="scss" scoped>
.m-wallet-address {
  padding-top: 20px;
  &-title {
    font-family: Bugaki;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;

    color: #000000;
  }
  &-content {
    padding-top: 10px;
    font-family: Arial;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    /* line-height: 14px; */
    /* identical to box height */
    color: #171717;
    span {
      border-bottom: 1px solid #000000;
    }
  }
}
.wallet-account-title {
  font-family: Bugaki;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  color: #000000;
  padding-bottom: 8px;
}
.chfry-address {
  font-family: Bugaki;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 21px;
  color: #000000;
  padding-right: 10px;
}

.add-wallet-address {
  display: flex;
  align-items: center;
  padding-right: 38px;
  &-fusd {
    padding-right: 16px;
    cursor: pointer;
  }
  &-cheese {
    cursor: pointer;
  }
}
@media screen and (max-width: 1279px) and (min-width: 751px) {
  .btn-img1 {
    height: 24px;
  }
  .img-btn {
    height: 42px;
  }
  .right-pane {
    /*width: 262px;*/
    justify-content: flex-end !important;
  }
}

@media screen and (max-width: 1439px) and (min-width: 1280px) {
  .btn-img1 {
    height: 26px;
  }
  .img-btn {
    height: 48px;
  }
  .right-pane {
    width: 243px;
    justify-content: flex-end !important;
  }
}

@media screen and (min-width: 1440px) {
  .btn-img1 {
    height: 28px;
  }
  .img-btn {
    height: 60px;
  }
  .right-pane {
    width: 262px;
    justify-content: flex-end !important;
  }
}

::v-deep .ant-menu-horizontal {
  line-height: 36px !important;
  margin: 5px;
}

::v-deep .ant-popover-inner-content {
  padding: 12px 5px 12px 18px;
}

::v-deep .ant-menu-horizontal > .ant-menu-item:hover,
.ant-menu-horizontal > .ant-menu-submenu:hover,
.ant-menu-horizontal > .ant-menu-item-active,
.ant-menu-horizontal > .ant-menu-submenu-active,
.ant-menu-horizontal > .ant-menu-item-open,
.ant-menu-horizontal > .ant-menu-submenu-open,
.ant-menu-horizontal > .ant-menu-item-selected,
.ant-menu-horizontal > .ant-menu-submenu-selected {
  border: 0;
  background: #f4f4f4;
  border-radius: 8px;
  /*color: rgba(68, 68, 68,1);*/
}

::v-deep .ant-menu-horizontal > .ant-menu-item,
.ant-menu-horizontal > .ant-menu-submenu {
  border-bottom: 0;
}

::v-deep .ant-menu-horizontal > .ant-menu-item > a {
  color: rgba(68, 68, 68, 0.65);
}

::v-deep .ant-menu-horizontal > .ant-menu-item > a:hover {
  color: #444444;
}

::v-deep .ant-menu-horizontal > .ant-menu-item-selected > a {
  color: rgba(68, 68, 68, 1);
}

::v-deep .submenu-title-wrapper {
  font-size: 14px;

  .menu-submenu-arrow {
    background-color: rgb(170, 25, 25);
  }

  .menu-submenu-arrow::before {
    width: 6px;
    height: 1.5px;
    background: rgba(0, 0, 0, 0.65);
    background-image: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.65),
      rgba(0, 0, 0, 0.65)
    );
    border-radius: 2px;
    // transition: background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    //   transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    //   top 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    content: "";
  }
}

.btn-img:hover {
  opacity: 0.6;
}

.p1 {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;

  .img1 {
    margin-right: 16px;
  }
}

.p2 {
  display: flex;
  align-items: center;

  .p2-1 {
    width: 50px;
    height: 50px;
    img {
      width: 100%;
    }
  }

  .p2-2 {
    display: flex;
    flex-direction: column;
    align-items: self-start;
    margin-left: 20px;

    .p2-2-1 {
      display: flex;
      align-items: center;

      .p2-2-1-img {
        margin-left: 12px;
      }
    }

    .p2-2-2 {
      text-align: left;
      button {
        padding: 0px;
        border-bottom: 1px solid;
        border-radius: 0;
        height: 22px;

        font-family: Arial;
        font-style: normal;
        font-weight: bold;
        font-size: 12px;
        line-height: 14px;
        color: #171717;
      }
    }
  }

  .img-btn {
    width: 60px;
    height: 60px;
  }
}

.chr-flex-center {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.btn-con {
  .btn {
    width: 129px;
    height: 53px;

    font-family: Arial Black;
    font-style: normal;
    font-weight: 900;
    font-size: 14px;
    line-height: 20px;
    color: #1d1d1b;
    padding: 0 0 5px 5px;
  }
  .btn:active {
    padding: 10px 10px 5px 5px;
  }
}

.right-text-item {
  width: 160px;
  height: 31px;
  background: #e7e7e7;
  border-radius: 10px;
  font-size: 12px;
  font-family: SwedenSans-Regular;
  font-weight: 900;
  color: #444444;
  line-height: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.right-text-item2 {
  width: 160px;
  height: 31px;
  background: white;
  border-radius: 10px;
  /*border: 2px solid #444444;*/
  font-size: 12px;
  font-family: SwedenSans-Regular;
  font-weight: 900;
  color: #444444;
  line-height: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;
  margin-left: -36px;
  cursor: pointer;
}

.right-text-item3 {
  width: 160px;
  height: 31px;
  background: rgb(20 197 152 / 15%);
  border-radius: 10px;
  border: 2px solid #16c89b;
  font-size: 12px;
  font-family: SwedenSans-Regular;
  font-weight: 900;
  color: #14c598;
  line-height: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;
  margin-left: -36px;
  cursor: pointer;
}

.anticon {
  font-size: 8px;
}

.sub-menu-box {
  .anticon {
    font-size: 3rem;
  }
}

.page-bg1 {
  background-image: url("../assets/bg.jpg");
}

.page-bg2 {
  background-image: url("../assets/bg2.jpg");
}

.layout-header-page {
  display: flex;
  align-items: start;
  justify-content: space-between;
  padding: 10px 60px 5px;
  margin: 0 auto;
  /*background-color: #fccdd9;*/

  background-repeat: repeat-y;
  background-size: 100%;
  @media screen and (max-width: 970px) {
    padding-left: 60px;
    padding-right: 60px;
  }
  @media screen and (max-width: 750px) {
    padding-left: 10px;
    padding-right: 10px;
  }

  .logo-text {
    font-size: 22px;
    font-family: CircularPro-Black, CircularPro;
    font-weight: 900;
    color: #000000;
    line-height: 28px;
    margin-left: 18px;
  }

  .menu-box {
    /*width: 413px;*/
    height: auto;
    border-radius: 8px;
    text-align: center;
    overflow: hidden;

    .ant-menu-horizontal {
      border-bottom: none;
      line-height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .btn {
      font-family: Bugaki;
      font-style: normal;
      /*font-weight: bold;*/
      font-size: 24px;
      line-height: 37px;
      /* identical to box height */
      color: #000000;

      border-bottom: 2px solid;
    }

    .nav-active {
      border-bottom: 2px solid;
    }

    .ant-btn:not([disabled]):hover {
      border-bottom: 2px solid;
    }

    .cheese-nav-btn {
      font-family: Bugaki;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 21px;

      color: #000000;
      -webkit-border-radius: 0;
      -moz-border-radius: 0;
      border-radius: 0;

      height: 22px;
      padding: 0;
      margin: 0 10px;
    }
  }

  .tel {
    background-color: rgb(0 0 0 / 40%);
    position: absolute;
    right: 0;
    top: 30vh;
    border-radius: 8px;
  }
}

.left-icon-box {
  display: flex;
  align-items: center;
}

.right-phone-box {
  display: flex;
  align-items: center;

  img {
    width: 25px;
    height: 25px;
  }

  .phone-box {
    font-size: 14px;
    font-weight: 800;
    color: #444444;
    line-height: 21px;
    margin-left: 13px;
  }
}
</style>
