<script>
export default {
  props: {
    data: {
      default: () => {
        return "";
      },
    },
    styled: {
      type: Object,
      default: () => {
        return {};
      },
    },
    detail: {
      default: () => {
        return "";
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
        columns: this.columns,
      },
    };
    return (
      <a-tooltip props={props} scopedSlots={this.$scopedSlots} on={on}>
        <template slot="title">{this.detail || this.data}</template>
        <span style={this.styled}>{this.data}</span>
      </a-tooltip>
    );
  },
};
</script>
