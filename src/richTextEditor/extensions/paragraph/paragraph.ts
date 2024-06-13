import { mergeAttributes } from '@tiptap/core';
import BasicParagraph from '@tiptap/extension-paragraph';
import { getStringStyle, parseStyle } from '../../utils';

const Paragraph = BasicParagraph.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            style: {
                default: '',
            },
            textAlign: {
                parseHTML: (element) => element.style.textAlign,
                renderHTML: (attributes) => {
                    if (!attributes.textAlign) {
                        return false;
                    }
                    return { style: `text-align: ${attributes.textAlign}` };
                },
            },
        };
    },
    renderHTML({ HTMLAttributes }) {
        const style = HTMLAttributes.style;
        HTMLAttributes.style = getStringStyle(parseStyle(style));
        return ['p', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },
});

export default Paragraph;
