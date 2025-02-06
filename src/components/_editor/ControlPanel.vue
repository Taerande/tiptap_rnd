<template>
  <div class="control-panel" v-if="editor">
    <button
      :class="{ 'is-active': editor.isActive('bold') }"
      @click="editor.chain().focus().toggleBold().run()"
    >
      Bold
    </button>
    <button
      :class="{ 'is-active': editor.isActive('italic') }"
      @click="editor.chain().focus().toggleItalic().run()"
    >
      Italic
    </button>
    <button
      :class="{ 'is-active': editor.isActive('underline') }"
      @click="editor.chain().focus().toggleUnderline().run()"
    >
      Underline
    </button>
    <button
      :class="{ 'is-active': editor.isActive('strike') }"
      @click="editor.chain().focus().toggleStrike().run()"
    >
      Strike
    </button>
    <button
      :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
    >
      H1
    </button>
    <button
      :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
    >
      H2
    </button>
    <button
      :class="{ 'is-active': editor.isActive('bulletList') }"
      @click="editor.chain().focus().toggleBulletList().run()"
    >
      Bullet List
    </button>
    <button
      :class="{ 'is-active': editor.isActive('orderedList') }"
      @click="editor.chain().focus().toggleOrderedList().run()"
    >
      Ordered List
    </button>
    <button
      :class="{ 'is-active': editor.isActive('codeBlock') }"
      @click="editor.chain().focus().toggleCodeBlock().run()"
    >
      Code Block
    </button>
    <button
      :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
      @click="editor.chain().focus().setTextAlign('center').run()"
    >
      Align Center
    </button>
    <button
      :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
      @click="editor.chain().focus().setTextAlign('right').run()"
    >
      Align Right
    </button>
    <button
      :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
      @click="editor.chain().focus().setTextAlign('justify').run()"
    >
      Justify
    </button>
    <button @click="setLink" :class="{ 'is-active': editor.isActive('link') }">
      Set link
    </button>
    <button
      @click="editor.chain().focus().unsetLink().run()"
      :disabled="!editor.isActive('link')"
    >
      Unset link
    </button>
    <button @click="addImage">Add image</button>
    <button @click="editor.chain().focus().undo().run()">Undo</button>
    <button @click="editor.chain().focus().redo().run()">Redo</button>
  </div>
</template>
<script>
export default {
  props: ["editor"],
  data() {
    return {};
  },
  methods: {
    addImage() {
      const url = window.prompt("URL");

      if (url) {
        this.editor.chain().focus().setImage({ src: url }).run();
      }
    },
    setLink() {
      const previousUrl = this.editor.getAttributes("link").href;
      const url = window.prompt("URL", previousUrl);

      // cancelled
      if (url === null) {
        return;
      }

      // empty
      if (url === "") {
        this.editor.chain().focus().extendMarkRange("link").unsetLink().run();

        return;
      }

      // update link
      this.editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    },
  },
};
</script>
<style scoped>
.is-active {
  background-color: black;
  color: white;
}
</style>
