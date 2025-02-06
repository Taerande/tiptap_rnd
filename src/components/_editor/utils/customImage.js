import Image from "@tiptap/extension-image";

const CustomImage = Image.extend({
    addOptions() {
      return {
        ...this.parent?.(),
        HTMLAttributes: {},
        alignments: ['left', 'center', 'right'],
      }
    },
  
    addAttributes() {
      return {
        ...this.parent?.(),
        alignment: {
          default: 'left',
          parseHTML: element => element.getAttribute('data-alignment'),
          renderHTML: attributes => {
            return {
              'data-alignment': attributes.alignment,
              style: `display: block; margin: ${attributes.alignment === 'center' ? '0 auto' : `${attributes.alignment === 'right' ? '0 0 0 auto' : '0 auto 0 0'}`}`,
            }
          },
        },
      }
    },
  
    addCommands() {
      return {
        ...this.parent?.(),
        setImageAlignment:
          (alignment) =>
          ({ commands }) => {
            return commands.updateAttributes('image', { alignment })
          },
      }
    },
  })

export default CustomImage;