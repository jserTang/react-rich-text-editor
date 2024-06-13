import { Node } from '@tiptap/core';
import { getStringStyle, parseStyle } from '../../utils';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        div: {};
    }
}

export const Div = Node.create({
    name: 'div',

    content: 'block*',

    group: 'block',

    defining: true,

    addAttributes() {
        return {
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
                tag: 'div',
                getAttrs: (element) => {
                    const $ele = element as HTMLSelectElement;
                    const style = $ele.style.cssText?.trim();
                    const attrs: Record<string, any> = {};
                    style && (attrs.style = style);
                    return attrs;
                },
            },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        const style = HTMLAttributes.style;
        HTMLAttributes.style = getStringStyle(parseStyle(style));
        return ['div', HTMLAttributes, 0];
    },
});
