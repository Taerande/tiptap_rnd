<template>
  <div class="editor-wrapper" @paste="handlePaste">
    <editor-content :editor="editor" />
    <SlashComponents v-if="isSlashing" />
    <ControlPanel :editor="editor" />
    <div class="result">
      <div v-html="modelValue"></div>
      <hr />
      <div>{{ modelValue }}</div>
    </div>
  </div>
</template>

<script>
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent } from "@tiptap/vue-3";
import SlashComponents from "./_editor/SlashComponents.vue";
import ControlPanel from "./_editor/ControlPanel.vue";
import TextAlign from "@tiptap/extension-text-align";
import Mention from "@tiptap/extension-mention";
import Link from "@tiptap/extension-link";
import suggestion from "./_editor/utils/suggestion";
import Placeholder from "@tiptap/extension-placeholder";
import CustomImage from "./_editor/utils/customImage";

export default {
  components: {
    EditorContent,
    ControlPanel,
    SlashComponents,
  },

  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },

  emits: ["update:modelValue"],

  data() {
    return {
      editor: null,
      isSlashing: false,
    };
  },

  watch: {
    modelValue(value) {
      // HTML
      const isSame = this.editor.getHTML() === value;

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return;
      }

      this.editor.commands.setContent(value, false);
    },
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        CustomImage,
        Placeholder.configure({
          placeholder: "Write something …",
        }),
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        Link.configure({
          openOnClick: false,
          autolink: true,
          defaultProtocol: "https",
        }),
        Mention.configure({
          HTMLAttributes: {
            class: "mention",
          },
          suggestion,
        }),
      ],
      content: this.modelValue,
      onUpdate: () => {
        // HTML
        this.$emit("update:modelValue", this.editor.getHTML());

        // JSON
        // this.$emit('update:modelValue', this.editor.getJSON())
      },
    });
  },
  methods: {
    handlePaste(event) {
      event.preventDefault();
      const clipboardData = event.clipboardData || window.clipboardData;
      const items = clipboardData.items;

      // 이미지가 붙여졌는지 확인
      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        // 이미지인지 확인
        if (item.type.indexOf("image") === 0) {
          const file = item.getAsFile();
          const blobURL = URL.createObjectURL(file);
          this.editor.chain().focus().setImage({ src: blobURL }).run();
          return;
        }
      }
      // 이미지가 아니면 텍스트만 처리
      const pastedContent = clipboardData.getData("text");
      if (this.editor) {
        this.editor.chain().focus().insertContent(pastedContent).run(); // 텍스트 삽입
      }
    },

    createImageURL(file) {
      const blobUrl = URL.createObjectURL(file);
      return blobUrl;
      // this.editor.chain().focus().setImage({ src: blobUrl }).run();
    },

    handleMention() {
      const selection = this.editor.state.selection;
      const textBefore = this.editor.state.doc.textBetween(
        Math.max(0, selection.from - 20),
        selection.from,
        "\n",
        ""
      );

      const match = textBefore.match(/@([\w]*)$/);

      if (match) {
        console.log("matched");
        //   this.mentionQuery = match[1];
        //   this.filteredMentions = this.mentionItems.filter(user =>
        //     user.toLowerCase().startsWith(this.mentionQuery.toLowerCase())
        //   );
        //   this.mentionListVisible = this.filteredMentions.length > 0;
        // } else {
        //   this.mentionListVisible = false;
      }
    },
    handleKeydown(event) {
      if (event.key === "Enter" && this.mentionListVisible) {
        event.preventDefault();
        // this.insertMention(this.filteredMentions[0]);
      }
    },
  },
  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>
<style>
.tiptap p.is-editor-empty:first-child::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>

<style scoped>
.editor-wrapper {
  position: relative;
  width: 1700px;
  display: flex;
  column-gap: 16px;
}

.result {
  padding: 1rem;
  border: 1px solid gray;
  flex: 1;
}

.control-panel {
  position: absolute;
  top: -80px;
  display: flex;
  gap: 5px;
}

.result :deep(p) {
  margin: 0px;
  height: 1rem;
  color: blue;
  /* 이렇게 하면 scoped를 벗어난 p 태그에 스타일을 적용 */
}

.result :deep(img) {
  margin-block: 1rem;
}

.result :deep(.mention) {
  background-color: blueviolet;
  border-radius: 0.25rem;
  padding: 0px 0.5rem;
  color: white;
}

:deep(.tiptap),
.result {
  width: 900px;
  height: 600px;
  overflow-y: auto;
  border: 1px solid black;
  padding: 1rem;

  &.ProseMirror-focused {
    outline: 1px solid blue;
    border: 1px solid blue;
  }

  ul,
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;
  }

  ul li p,
  ol li p {
    margin: 0px !important;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    font-size: 1.5rem;
    text-wrap: pretty;
  }

  h1,
  h2 {
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  h4,
  h5,
  h6 {
    font-size: 1rem;
  }

  em {
    font-style: oblique !important;
  }

  code {
    background-color: #f5f5f5;
    border-radius: 0.4rem;
    color: black;
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
  }

  pre {
    background: black;
    border-radius: 0.5rem;
    color: white;
    font-family: "JetBrainsMono", monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;
    overflow-x: auto;
  }

  pre code {
    background: none;
    color: inherit;
    font-size: 0.8rem;
    padding: 0;
  }

  blockquote {
    border-left: 3px solid gray;
    margin: 1.5rem 0;
    padding-left: 1rem;
    font-style: italic;
  }

  hr {
    border: none;
    border-top: 1px solid gray;
    margin: 2rem 0;
  }
}
</style>

<style>
.tiptap {
  p {
    margin: 0;
  }

  img {
    display: block;
    height: auto;
    margin: 1.5rem 0;
    max-width: 100%;

    &.ProseMirror-selectednode {
      outline: 3px solid purple;
    }
  }
}
</style>
