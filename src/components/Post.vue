<template>
  <div class="post-container">
    <div class="image-container">
      <img class="image" loading="lazy" :src="img" :alt="title">
    </div>
    <div class="text-container">
      <h3>{{ title }} - {{ date }}</h3>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Post',
  props: {
    img: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    }
  }
})
</script>

<style scoped lang="scss">
.post-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  border-radius: 5px;
  margin-bottom: 15px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
}
.image-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
.image {
  max-width: 100%;
  max-height: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.text-container {
  padding: 0 15px 0 15px;
}
h3 {
  font-size: 1rem;
}
p {
  font-size: 0.8rem;
}
</style>
