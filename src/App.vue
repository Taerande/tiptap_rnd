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
</style>
