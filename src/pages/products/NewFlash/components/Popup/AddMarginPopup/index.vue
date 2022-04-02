<template>
  <Dialog :title="title" :dialogFlag="dialogFlag" @click="handleClose">
    <div class="m-add-margin-popup-container">
      <SelectInput
        id="add_margin"
        :selectData="selectData"
        :inputData="inputData"
        :handleSelectChange="handleSelectChange"
      />
      <div class="m-add-margin-popup-btn">
        <a-button :loading="loading" :disabled="disabled" class="chr-c-btn" @click="handleConfirm">
          {{ btnText }}
        </a-button>
      </div>
    </div>
  </Dialog>
</template>

<script>
import Dialog from "../../common/Dialog";
import SelectInput from "../../common/SelectInput";

export default {
  components: {
    Dialog,
    SelectInput,
  },
  props: {
    btnText: {
      type: String,
      default: () => {
        return "CONFIRM";
      },
    },
    //输入框Data
    inputData: {
      type: Object,
      default: () => {
        return {
          defaultValue: "",
          placeholder: "",
          autoFocus:true,
          value: "",
        };
      },
    },

    // 下拉框Data
    selectData: {
      type: Object,
      default: () => {
        return {
          defaultValue: "",
          optionsData: [],
        };
      },
    },

    // Button 是否禁用
    disabled: {
      type: Boolean,
      default: () => {
        return false;
      },
    },

    // Button 是否loading
    loading: {
      type: Boolean,
      default: () => {
        return false;
      },
    },

    // popup title
    title: {
      type: String,
      default: () => {
        return "";
      },
    },

    // dialog 开关
    dialogFlag: {
      type: Boolean,
      default: () => {
        return true;
      },
    },

    // dialog 关闭事件
    handleClose: {
      type: Function,
      default: () => {
        return () => {};
      },
    },

    // 确认按钮
    handleConfirm: {
      type: Function,
      default: () => {
        return () => {};
      },
    },

    // 下拉框change事件
    handleSelectChange: {
      type: Function,
      default: () => {
        return () => {};
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.m-add-margin-popup-container {
  ::v-deep .ant-input-group-wrapper {
    .ant-input-wrapper {
      #add_margin {
        background-color: transparent;
      }
      .ant-input-group-addon {
        background-color: transparent;
      }
    }
  }
}
.m-add-margin-popup-container {
  padding-top: 40px;
  .m-add-margin-popup-btn {
    width: 100%;
    padding-top: 101px;
    display: flex;
    justify-content: space-around;
    .chr-c-btn {
      min-width: 120px !important;
      height: 38px !important;
      border: 2px solid #000000;
      background-color: #fff;
      font-family: Arial Black;
      font-style: normal;
      font-weight: 900;
      font-size: 14px;
      line-height: 25px !important;
      &:hover,
      &:focus,
      &:active {
        background-color: #000000;
      }
    }
  }
}
</style>
