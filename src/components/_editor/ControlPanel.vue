<template>
  <div class="control-panel" v-if="editor">
    <v-btn-toggle multiple v-model="selected">
      <v-btn size="x-small" height="32">
        <v-icon>mdi-format-bold</v-icon>
      </v-btn>

      <v-btn size="x-small" height="32">
        <v-icon>mdi-format-italic</v-icon>
      </v-btn>

      <v-btn size="x-small" height="32">
        <v-icon>mdi-format-underline</v-icon>
      </v-btn>

      <v-btn size="x-small" height="32">
        <v-icon>mdi-format-color-fill</v-icon>
      </v-btn>
    </v-btn-toggle>
    <v-btn :class="{ 'is-active': editor.isActive('bold') }" @click="editor.chain().focus().toggleBold().run()">
      <v-icon>mdi-format-bold</v-icon>
    </v-btn>
    <v-btn :class="{ 'is-active': editor.isActive('italic') }" @click="editor.chain().focus().toggleItalic().run()">
      <v-icon>mdi-format-italic</v-icon>
    </v-btn>
    <v-btn :class="{ 'is-active': editor.isActive('underline') }"
      @click="editor.chain().focus().toggleUnderline().run()">
      Underline
    </v-btn>
    <v-btn :class="{ 'is-active': editor.isActive('strike') }" @click="editor.chain().focus().toggleStrike().run()">
      Strike
    </v-btn>
    <v-btn :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">
      H1
    </v-btn>
    <v-btn :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
      H2
    </v-btn>
    <v-btn :class="{ 'is-active': editor.isActive('bulletList') }"
      @click="editor.chain().focus().toggleBulletList().run()">
      Bullet List
    </v-btn>
    <v-btn :class="{ 'is-active': editor.isActive('orderedList') }"
      @click="editor.chain().focus().toggleOrderedList().run()">
      Ordered List
    </v-btn>
    <v-btn :class="{ 'is-active': editor.isActive('codeBlock') }"
      @click="editor.chain().focus().toggleCodeBlock().run()">
      Code Block
    </v-btn>
    <v-btn :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }" @click="alignCenter">
      Align Center
    </v-btn>
    <v-btn :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }" @click="alignRight">
      Align Right
    </v-btn>
    <v-btn :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }" @click="alignLeft">
      Align Left
    </v-btn>
    <v-btn @click="setLink" :class="{ 'is-active': editor.isActive('link') }">
      Set link
    </v-btn>
    <v-btn @click="editor.chain().focus().unsetLink().run()" :disabled="!editor.isActive('link')">
      Unset link
    </v-btn>
    <v-btn @click="addImage">Add image</v-btn>
    <v-btn @click="editor.chain().focus().undo().run()">Undo</v-btn>
    <v-btn @click="editor.chain().focus().redo().run()">Redo</v-btn>
  </div>
</template>
<script>
export default {
  props: ["editor"],
  data() {
    return { selected: [] };
  },
  methods: {
    addImage() {
      const url = window.prompt("URL");

      if (url) {
        this.editor.chain().focus().setImage({ src: url }).run();
      }
    },
    alignRight() {
      if (this.editor.isActive("image")) {
        this.editor.commands.updateAttributes("image", { alignment: "right" });
      } else {
        this.editor.chain().focus().setTextAlign("right").run();
      }
    },
    alignLeft() {
      if (this.editor.isActive("image")) {
        this.editor.commands.updateAttributes("image", { alignment: "left" });
      } else {
        this.editor.chain().focus().setTextAlign("justify").run();
      }
    },
    alignCenter() {
      if (this.editor.isActive("image")) {
        this.editor.commands.updateAttributes("image", { alignment: "center" });
      } else {
        this.editor.chain().focus().setTextAlign("center").run();
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
