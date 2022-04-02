<script>
export default {
  props: {
    dataSource: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  render() {
    const on = {
      ...this.$listeners,
    };
    const props = {
      ...this.$attrs,
      ...this.$props,
      ...{
        dataSource: this.dataSource,
      },
    };
    const slots = Object.keys(this.$slots).map((slot) => {
      return <template slot={slot}>{this.$slots[slot]}</template>;
    });
    const table = (
      <a-table props={props} scopedSlots={this.$scopedSlots} on={on}>
        {slots}
      </a-table>
    );
    return <div class="m-chfry-table">{table}</div>;
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
<style>
::v-deep .ant-table-row {
  background: #f499ad !important;
}
.ant-table-row {
  background: #f499ad !important;
}
</style>
