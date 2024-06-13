import Image from '@tiptap/extension-image';

interface ImageAttr {
    src: string;
    alt?: string;
    title?: string;
    width?: string;
    height?: string;
    style?: string;
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        img: {
            setImage: (options: ImageAttr) => ReturnType;
        };
    }
}

export const Img = Image.extend({
    name: 'img',

    addOptions() {
        return {
            inline: true,
            allowBase64: false,
            HTMLAttributes: {},
        };
    },

    inline() {
        return this.options.inline;
    },

    addAttributes() {
        return {
            ...this.parent?.(),
            width: {
                default: null,
            },
            height: {
                default: null,
            },
            style: {
                default: '',
            },
        };
    },
});
