<script></script>

<template>
  <div>
    <h3><slot name="title"></slot></h3>
    <slot name="img"></slot>

    <h4><slot name="price"></slot></h4>
    <slot name="button">
      <button>buy this book</button>
      <button>remove from cart</button>
    </slot>
  </div>
</template>

<style>
div {
  justify-content: center;
  flex-direction: column;
  text-align: center;
}
</style>
