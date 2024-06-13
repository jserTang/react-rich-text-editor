import { Node } from '@tiptap/core';
import { getStringStyle, parseStyle } from '../../utils';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        section: {};
    }
}

export const Section = Node.create({
    name: 'section',

    content: 'block*',

    group: 'block',

    defining: true,

    addAttributes() {
        return {
            class: {
                default: '',
            },
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
    parseHTML() {
        return [
            {
                tag: 'section',
                getAttrs: (element) => {
                    const $ele = element as HTMLSelectElement;
                    if (!$ele.innerHTML && !$ele.style.cssText) {
                        return false;
                    }
                    return {};
                },
            },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        const style = HTMLAttributes.style;
        HTMLAttributes.style = getStringStyle(parseStyle(style));
        return ['section', HTMLAttributes, 0];
    },
});
