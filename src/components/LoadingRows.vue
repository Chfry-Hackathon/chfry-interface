<template>
  <div class="m-loading-wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@keyframes loadingAnimation {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.m-loading-wrapper {
  display: grid;
  min-width: 75%;
  max-width: 960px;
  grid-column-gap: 0.5em;
  grid-row-gap: 0.8em;
  grid-template-columns: repeat(3, 1fr);
  & > div {
    animation: loadingAnimation 1.5s infinite;
    animation-fill-mode: both;
    background: linear-gradient(to left, #f5c4ce 25%, #f8b9c6 50%, #f499ad 75%);
    background-size: 400%;
    border-radius: 12px;
    height: 2.4em;
    will-change: background-position;
  }
  & > div:nth-child(4n + 1) {
    grid-column: 1 / 3;
  }
  & > div:nth-child(4n) {
    grid-column: 3 / 4;
    margin-bottom: 2em;
  }
}
</style>
