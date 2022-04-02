<template>
  <div class="m-chfry-shade-box" ref="shade" name="bounce" @click.stop="handleClick">
    <div class="m-chfry-shade-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blur: 1,
    };
  },
  methods: {
    handleClick() {},
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 4s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
.m-chfry-shade-box {
  position: absolute;
  left: 0;
  right: 0;
  top: -15px;
  /* bottom: 0; */
  bottom: 156px;
  z-index: 20;
  backdrop-filter: blur(3px);

  user-select: none;
  .m-chfry-shade-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
}
</style>
