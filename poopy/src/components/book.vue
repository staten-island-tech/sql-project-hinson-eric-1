<script></script>

<template>
  <div>
    <h3><slot name="title"></slot></h3>
    <slot name="img"></slot>

    <h4><slot name="price"></slot></h4>
    <slot name="button"> </slot>
  </div>
</template>

<style scoped>
div {
  justify-content: center;
  flex-direction: column;
  text-align: center;
  flex-wrap: wrap;
  width: 250px;
}
</style>
