<template>
  <div>
    <TextEditor v-model="content" />
  </div>
</template>
<script>
import TextEditor from "./components/TextEditor.vue";
export default {
  components: {
    TextEditor,
  },
  data() {
    return {
      content: null,
    };
  },
};
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
