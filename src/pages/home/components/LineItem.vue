<template>
  <section class="m-line-container">
    <div class="m-line-content">
      <header class="m-line-header">
        <span class="m-line-header-title">{{ dataItem.title }}</span>
      </header>
      <main class="m-line-main">
        <ul
          class="m-line-main-desc"
          v-if="dataItem.data && dataItem.data.length > 0"
        >
          <li
            v-for="(item, index) in dataItem.data"
            :key="item.id ? item.id : index"
          >
            {{ item.text }}
          </li>
        </ul>
      </main>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    dataItem: {
      default: {},
      type: Object,
    },
  },
};
</script>

<style lang="scss" scope>
@media screen and (max-width: 750px) {
  .m-line-container {
    height: 301px;
    width: 275px;

    .m-line-content {
      position: relative;
      width: 275px;
      height: 276px;
      margin-top: 25px;

      .m-line-header {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        position: absolute;
        left: 0;
        right: 0;
        top: -25px;

        .m-line-header-title {
          width: 153px;
          height: 50px;
          background-image: url("../../../assets/home/title.svg");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          text-align: center;
          line-height: 50px;
          font-family: Bugaki;
          font-style: normal;
          font-weight: normal;
          font-size: 20px;
          color: #171717;
        }
      }

      .m-line-main {
        width: 100%;
        height: 276px;
        background-image: url("../../../assets/home/375line.svg");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: flex;
        align-items: center;
        justify-content: space-around;

        .m-line-main-desc {
          /* width: 100%;
          height: 100%;
          padding-top: 44px;
          padding-bottom: 10px; */
          font-family: Arial Black;
          font-style: normal;
          font-weight: 900;
          font-size: 16px;
          line-height: 23px;
          color: #171717;
          box-sizing: border-box;
          li {
            margin-left: 10px;
            padding-right: 16px;
            /* width: 240px; */
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1279px) and (min-width: 751px) {
  .m-line-container {
    /* height: 264px; */
    width: 310px;

    .m-line-content {
      position: relative;
      width: 310px;
      height: 238px;
      margin-top: 25px;

      .m-line-header {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        position: absolute;
        left: 0;
        right: 0;
        top: -25px;

        .m-line-header-title {
          width: 153px;
          height: 50px;
          background-image: url("../../../assets/home/title.svg");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          text-align: center;
          line-height: 50px;
          font-family: Bugaki;
          font-style: normal;
          font-weight: normal;
          font-size: 20px;
          color: #171717;
        }
      }

      .m-line-main {
        width: 100%;
        height: 238px;
        background-image: url("../../../assets/home/line.svg");
        background-size: 100% 100%;
        background-repeat: no-repeat;

        .m-line-main-desc {
          width: 100%;
          height: 100%;
          padding-top: 44px;
          padding-bottom: 10px;
          font-family: Arial Black;
          font-style: normal;
          font-weight: 900;
          font-size: 16px;
          line-height: 23px;
          color: #171717;
          box-sizing: border-box;
          li {
            margin-left: 35px;
            padding-right: 40px;
            width: 100%;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1439px) and (min-width: 1280px) {
  .m-line-container {
    /* height: 264px; */
    width: 310px;

    .m-line-content {
      position: relative;
      width: 310px;
      height: 238px;
      margin-top: 25px;

      .m-line-header {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        position: absolute;
        left: 0;
        right: 0;
        top: -25px;

        .m-line-header-title {
          width: 153px;
          height: 50px;
          background-image: url("../../../assets/home/title.svg");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          text-align: center;
          line-height: 50px;
          font-family: Bugaki;
          font-style: normal;
          font-weight: normal;
          font-size: 20px;
          color: #171717;
        }
      }

      .m-line-main {
        width: 100%;
        height: 238px;
        background-image: url("../../../assets/home/line.svg");
        background-size: 100% 100%;
        background-repeat: no-repeat;

        .m-line-main-desc {
          width: 100%;
          height: 100%;
          padding-top: 44px;
          padding-bottom: 10px;
          font-family: Arial Black;
          font-style: normal;
          font-weight: 900;
          font-size: 16px;
          line-height: 23px;
          color: #171717;
          box-sizing: border-box;
          li {
            margin-left: 35px;
            padding-right: 40px;
            width: 100%;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1440px) and (max-width: 1920px) {
  .m-line-container {
    /* height: 264px; */
    width: 310px;

    .m-line-content {
      position: relative;
      width: 310px;
      height: 238px;
      margin-top: 25px;

      .m-line-header {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        position: absolute;
        left: 0;
        right: 0;
        top: -25px;

        .m-line-header-title {
          width: 153px;
          height: 50px;
          background-image: url("../../../assets/home/title.svg");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          text-align: center;
          line-height: 50px;
          font-family: Bugaki;
          font-style: normal;
          font-weight: normal;
          font-size: 20px;
          color: #171717;
        }
      }

      .m-line-main {
        width: 100%;
        height: 238px;
        background-image: url("../../../assets/home/line.svg");
        background-size: 100% 100%;
        background-repeat: no-repeat;

        .m-line-main-desc {
          width: 100%;
          height: 100%;
          padding-top: 44px;
          padding-bottom: 10px;
          font-family: Arial Black;
          font-style: normal;
          font-weight: 900;
          font-size: 16px;
          line-height: 23px;
          color: #171717;
          box-sizing: border-box;
          li {
            margin-left: 35px;
            padding-right: 40px;
            width: 100%;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1440px) {
  .m-line-container {
    /* height: 264px; */
    width: 310px;

    .m-line-content {
      position: relative;
      width: 310px;
      height: 238px;
      margin-top: 25px;

      .m-line-header {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        position: absolute;
        left: 0;
        right: 0;
        top: -25px;

        .m-line-header-title {
          width: 153px;
          height: 50px;
          background-image: url("../../../assets/home/title.svg");
          background-size: 100% 100%;
          background-repeat: no-repeat;
          text-align: center;
          line-height: 50px;
          font-family: Bugaki;
          font-style: normal;
          font-weight: normal;
          font-size: 20px;
          color: #171717;
        }
      }

      .m-line-main {
        width: 100%;
        height: 238px;
        background-image: url("../../../assets/home/line.svg");
        background-size: 100% 100%;
        background-repeat: no-repeat;

        .m-line-main-desc {
          width: 100%;
          height: 100%;
          padding-top: 44px;
          padding-bottom: 10px;
          font-family: Arial Black;
          font-style: normal;
          font-weight: 900;
          font-size: 16px;
          line-height: 23px;
          color: #171717;
          box-sizing: border-box;
          li {
            margin-left: 35px;
            padding-right: 40px;
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
