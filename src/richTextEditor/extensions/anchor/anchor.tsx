import { mergeAttributes, RawCommands } from '@tiptap/core';
import Link from '@tiptap/extension-link';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        anchor: {
            /**
             * Set a link mark
             */
            setLink: (attributes: {
                href: string;
                title?: string | null;
                target?: string | null;
                rel?: string | null;
                class?: string | null;
            }) => ReturnType;
            addLink: (attributes: {
                href: string;
                text?: string | null;
                title?: string | null;
                target?: string | null;
                rel?: string | null;
                class?: string | null;
            }) => ReturnType;
            /**
             * Toggle a link mark
             */
            toggleLink: (attributes: {
                href: string;
                target?: string | null;
                rel?: string | null;
                class?: string | null;
            }) => ReturnType;
            /**
             * Unset a link mark
             */
            unsetLink: () => ReturnType;
            editLink: (attributes: {
                href: string;
                text: string;
                title?: string;
                target?: string | null;
                rel?: string | null;
                class?: string | null;
            }) => ReturnType;
        };
    }
}

export const Anchor = Link.extend({
    name: 'anchor',
    priority: 1001,
    inclusive: false,
    addAttributes() {
        return {
            ...this.parent?.(),
            title: {
                default: '',
            },
        };
    },

    renderHTML({ HTMLAttributes }) {
        if (HTMLAttributes.href?.startsWith('javascript:')) {
            return ['a', mergeAttributes(this.options.HTMLAttributes, { ...HTMLAttributes, href: '' }), 0];
        }
        return ['a', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },

    addCommands() {
        return {
            ...this.parent?.(),

            setLink:
                (attributes) =>
                ({ chain }) => {
                    return chain().unsetAllMarks().setMark('anchor', attributes).setMeta('preventAutolink', true).run();
                },
            addLink:
                (attributes) =>
                ({ chain, editor }) => {
                    if (attributes.text) {
                        const from = editor.state.selection.from;
                        const to = from + attributes.text.length;
                        return chain()
                            .focus()
                            .insertContent(attributes.text)
                            .setTextSelection({ from, to })
                            .setLink(attributes)
                            .setTextSelection({ from: to, to: to })
                            .run();
                    }
                    return chain().setLink(attributes).run();
                },

            editLink:
                (attributes) =>
                ({ chain, editor }) => {
                    let to = 0;
                    return chain()
                        .focus()
                        .extendMarkRange('anchor')
                        .command(({ tr }) => {
                            const from = tr.selection.$from.pos;
                            to = from + attributes.text.length;
                            tr.insertText(attributes.text, from, tr.selection.$to.pos);
                            tr.addMark(from, to, editor.schema.marks.anchor.create(attributes));
                            return true;
                        })
                        .updateAttributes('anchor', attributes)
                        .setTextSelection({ from: to, to: to })
                        .run();
                },
        } as Partial<RawCommands>;
    },
});
