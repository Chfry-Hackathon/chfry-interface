<style lang="scss" scoped>
/* .m-select-input-slot {
  display: flex;
  align-items: center;
  .max-btn-box {
    padding-right: 20px;
    .btn {
      font-size: 12px;
      display: inline-block;
      border: 1px solid #2c2c2c;
      width: 30px;
      border-radius: 5px;
      height: 19px;
      line-height: 18px;
      cursor: pointer;
      user-select: none;
      &:hover {
        color: #f499ad;
        background-color: #000000;
      }
    }
  }
} */
</style>
<template>
  <a-input
    step="0.000000000000000001"
    type="number"
    :min="0"
    :placeholder="inputData.placeholder"
    :autoFocus="inputData.autoFocus"
    v-model="inputData.value"
    @change="handleInputChange"
    :id="id"
    :disabled="inputData.disabled"
  >
    <div slot="addonAfter" class="m-select-input-slot">
      <!-- <div class="max-btn-box">
        <span class="btn">Max</span>
      </div> -->
      <a-select
        v-if="selectData.defaultValue"
        :default-value="selectData.defaultValue"
        @change="handleSelectChange"
        :id="selectId"
      >
        <a-select-option
          :value="item.value"
          class="m-chfry-select-option"
          v-for="(item, index) in selectData.optionsData"
          :key="index"
        >
          <span slot="menuItemSelectedIcon" class="m-options-icon">
            <img :src="item.iconUrl" :alt="item.value" />
          </span>
          {{ item.value }}
        </a-select-option>
      </a-select>
    </div>
  </a-input>
</template>

<script>
import { fixInput } from "../../../../../../utils/common-method";

export default {
  watch: {
    "inputData.value": {
      handler(v) {
        this.inputData.value = this.formatNumber(v);
      },
      immediate: true,
    },
  },
  methods: {
    formatNumber(v) {
      return fixInput(v, 6);
    },
  },
  props: {
    id: {
      type: String,
      default: () => {
        return "";
      },
    },
    selectId: {
      type: String,
      default: () => {
        return "m_select_box";
      },
    },
    inputData: {
      type: Object,
      default: () => {
        return {
          defaultValue: "",
          placeholder: "",
          value: "",
          disabled: false,
          autoFocus: false,
        };
      },
    },
    selectData: {
      type: Object,
      default: () => {
        return {
          defaultValue: "",
          optionsData: [],
        };
      },
    },
    handleSelectChange: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
    handleInputChange: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
  },
};
</script>

<style>
.m-chfry-select-option:hover {
  background-color: #f499ad !important;
}
.ant-select-dropdown-menu-item-selected {
  background-color: #f499ad !important;
}

.ant-input-group-addon .ant-select-open .ant-select-selection,
.ant-input-group-addon .ant-select-focused .ant-select-selection {
  color: #000000;
}
.ant-input::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #000000 !important;
  opacity: 0.5; /* Firefox */
}
</style>

<style lang="scss" scoped>
$bd-color: #000000;
$bg-color: #f499ad;

@media screen and (max-width: 750px) {
  .m-options-icon {
    padding-right: 8px;
    img {
      width: 16px;
      height: 16px;
    }
  }
  #m-chfry-select-option {
    background-color: $bg-color;
  }

  #m_select_box {
    width: 150px !important;
    font-family: Arial;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    color: #000000;
  }
  ::v-deep .ant-input-group-wrapper {
    width: 100%;
    height: 30px;
  }
  ::v-deep .ant-select-dropdown-menu-item {
    background: $bg-color !important;
  }
  ::v-deep .ant-input-wrapper {
    width: 100%;
    height: 30px;

    .ant-input {
      width: 100%;
      height: 30px;
      background-color: $bg-color;
      border-right: 0;
      border-top: 1px solid $bd-color;
      border-bottom: 1px solid $bd-color;
      border-left: 1px solid $bd-color;

      font-family: Arial;
      font-style: normal;
      font-weight: bold;
      font-size: 12px;
      color: #000000;
    }
    .ant-input:focus {
      border-right: 0;
      border-top: 1px solid $bd-color;
      border-bottom: 1px solid $bd-color;
      border-left: 1px solid $bd-color;
      box-shadow: none;
    }
    .ant-input-group-addon {
      background-color: $bg-color;
      border-right: 1px solid $bd-color;
      border-top: 1px solid $bd-color;
      border-bottom: 1px solid $bd-color;
      border-left: 0;
    }
  }
}

@media screen and (min-width: 751px) {
  .m-options-icon {
    padding-right: 8px;
    img {
      width: 28px;
      height: 28px;
    }
  }
  #m-chfry-select-option {
    background-color: $bg-color;
  }

  #m_select_box {
    width: 150px !important;
    font-family: Arial;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    color: #000000;
  }
  ::v-deep .ant-input-group-wrapper {
    width: 100%;
    height: 44px;
  }
  ::v-deep .ant-select-dropdown-menu-item {
    background: $bg-color !important;
  }
  ::v-deep .ant-input-wrapper {
    width: 100%;
    height: 44px;

    .ant-input {
      width: 100%;
      height: 44px;
      background-color: $bg-color;
      border-right: 0;
      border-top: 1px solid $bd-color;
      border-bottom: 1px solid $bd-color;
      border-left: 1px solid $bd-color;

      font-family: Arial;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      color: #000000;
    }
    .ant-input:focus {
      border-right: 0;
      border-top: 1px solid $bd-color;
      border-bottom: 1px solid $bd-color;
      border-left: 1px solid $bd-color;
      box-shadow: none;
    }
    .ant-input-group-addon {
      background-color: $bg-color;
      border-right: 1px solid $bd-color;
      border-top: 1px solid $bd-color;
      border-bottom: 1px solid $bd-color;
      border-left: 0;
    }
  }
}
</style>
