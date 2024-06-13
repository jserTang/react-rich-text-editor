import { RawCommands } from '@tiptap/core';
import TextStyleBase from '@tiptap/extension-text-style';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        fontSize: {
            setFontSize: (size: string) => ReturnType;
            unsetFontSize: () => ReturnType;
            unsetBackgroundColor: () => ReturnType;
        };
    }
}

export const TextStyle = TextStyleBase.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            fontSize: {
                default: null,
                parseHTML: (element) => element.style.fontSize.replace('px', ''),
                renderHTML: (attributes) => {
                    if (!attributes['fontSize']) {
                        return {};
                    }
                    return {
                        style: `font-size: ${attributes['fontSize']}px`,
                    };
                },
            },
            textIndent: {
                default: null,
                parseHTML: (element) => element.style.textIndent,
                renderHTML: (attributes) => {
                    if (!attributes['textIndent']) {
                        return {};
                    }
                    return {
                        style: `text-indent: ${attributes['textIndent']}`,
                    };
                },
            },
            letterSpacing: {
                default: null,
                parseHTML: (element) => element.style.letterSpacing,
                renderHTML: (attributes) => {
                    if (!attributes['letterSpacing']) {
                        return {};
                    }
                    return {
                        style: `letter-spacing: ${attributes['letterSpacing']}`,
                    };
                },
            },
            backgroundColor: {
                default: null,
                parseHTML: (element) => element.style.backgroundColor,
                renderHTML: (attributes) => {
                    if (!attributes['backgroundColor']) {
                        return {};
                    }
                    return {
                        style: `background-color: ${attributes['backgroundColor']}`,
                    };
                },
            },
            textDecorationLine: {
                default: null,
                parseHTML: (element) => element.style.textDecorationLine,
                renderHTML: (attributes) => {
                    if (!attributes['textDecorationLine']) {
                        return {};
                    }
                    return {
                        style: `text-decoration-line: ${attributes['textDecorationLine']}`,
                    };
                },
            },
        };
    },

    addCommands() {
        return {
            ...this.parent?.(),
            setFontSize:
                (fontSize) =>
                ({ chain }) => {
                    return chain().setMark('textStyle', { fontSize }).run();
                },
            unsetFontSize:
                () =>
                ({ chain }) => {
                    return chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run();
                },
            unsetBackgroundColor:
                () =>
                ({ chain }) => {
                    return chain().setMark('textStyle', { backgroundColor: null }).removeEmptyTextStyle().run();
                },
        } as Partial<RawCommands>;
    },
});
