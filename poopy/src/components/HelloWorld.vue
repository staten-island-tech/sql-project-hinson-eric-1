<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      buy our books buy our books buy our books buy our books buy our books buy our books play tears of the kingdom buy our books buy our books buy our books buy our books buy our books buy our books WHY IS MY WEBSITE OFF-CENTER??? buy our books buy our books buy our books buy our books buy our books buy our books buy our books buy our books 
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
  margin-top: 40px;
}

h3 {
  font-size: 1.2rem;
}

.greetings {
  height: 10em;
  position: relative }
.greetings p {
  margin: 0;
  background: yellow;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%) }


.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: center;
  }
}
</style>
