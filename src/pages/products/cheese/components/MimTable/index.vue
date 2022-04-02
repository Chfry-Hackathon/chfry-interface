<template>
  <div class="m-stake-table-container">
    <div class="m-stake-table-content">
      <div class="m-stake-table-left">
        <span class="table-header">Deposit</span>
        <span class="item">{{ "≥500 - 2499 $MIM" }}</span>
        <span class="item">{{ "≥2500 - 4999 $MIM" }}</span>
        <span class="item">{{ "≥5000 $MIM" }}</span>
      </div>
      <div class="m-stake-table-right">
        <span class="table-header">Staking Bonus</span>
        <span class="item">{{ "10 $CHEESE" }}</span>
        <span class="item">{{ "25 $CHEESE" }}</span>
        <span class="item">{{ "50 $CHEESE" }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.m-stake-table-container {
  .m-stake-table-content {
    display: flex;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.6);
    width: 268px;
    overflow: hidden;
    .m-stake-table-left,
    .m-stake-table-right {
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-direction: column;
      font-family: Arial;
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      color: #000000;
      line-height: 40px;
      .table-header {
        background: #fbb33b;
      }
      span {
          width: 133px;
        height: 40px;
      }
    
    }
    .m-stake-table-left {
      .table-header {
        border-right: 1px solid rgba(0, 0, 0, 0.6);
      }
      .item {
        width: 133px;
        height: 40px;
        border-top: 1px solid rgba(0, 0, 0, 0.6);
        border-right: 1px solid rgba(0, 0, 0, 0.6);
      }
    }
    .m-stake-table-right {
      .item {
        width: 133px;
        height: 40px;
        border-top: 1px solid rgba(0, 0, 0, 0.6);
      }
    }
  }
}
</style>
