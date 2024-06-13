import { Extension } from '@tiptap/core';

export interface GlobalAttributesOptions {
    types: string[];
}

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        globalAttributes: {
            clearAllAttributes: () => ReturnType;
        };
    }
}

export const GlobalAttributes = Extension.create<GlobalAttributesOptions>({
    name: 'globalAttributes',

    addOptions() {
        return {
            types: ['paragraph'],
        };
    },

    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    textAlign: {
                        parseHTML: (element) => element.style.textAlign,
                        renderHTML: (attributes) => {
                            if (!attributes.textAlign) {
                                return {};
                            }

                            return { style: `text-align: ${attributes.textAlign}` };
                        },
                    },
                    padding: {
                        parseHTML: (element) => element.style.padding,
                        renderHTML: (attributes) => {
                            if (!attributes.padding) {
                                return {};
                            }
                            return { style: `padding: ${attributes.padding}` };
                        },
                    },
                    paddingLeft: {
                        parseHTML: (element) => element.style.paddingLeft,
                        renderHTML: (attributes) => {
                            if (!attributes.paddingLeft) {
                                return {};
                            }
                            return { style: `padding-left: ${attributes.paddingLeft}` };
                        },
                    },
                    paddingRight: {
                        parseHTML: (element) => element.style.paddingRight,
                        renderHTML: (attributes) => {
                            if (!attributes.paddingRight) {
                                return {};
                            }
                            return { style: `padding-right: ${attributes.paddingRight}` };
                        },
                    },
                    backgroundImage: {
                        parseHTML: (element) => element.style.backgroundImage,
                        renderHTML: (attributes) => {
                            if (!attributes.backgroundImage) {
                                return {};
                            }
                            return { style: `background-image: ${attributes.backgroundImage}` };
                        },
                    },

                    backgroundSize: {
                        parseHTML: (element) => element.style.backgroundSize,
                        renderHTML: (attributes) => {
                            if (!attributes.backgroundSize) {
                                return {};
                            }
                            return { style: `background-size: ${attributes.backgroundSize}` };
                        },
                    },
                },
            },
        ];
    },

    addCommands() {
        return {
            clearAllAttributes:
                () =>
                ({ commands }) => {
                    return this.options.types.every((type) => commands.resetAttributes(type, 'textAlign'));
                },
        };
    },
});
