import './video.scss';
import { Node, mergeAttributes } from '@tiptap/core';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        video: {
            setVideo: (src: string, options?: { width?: string; height?: string }) => ReturnType;
        };
    }
}

export const Video = Node.create({
    name: 'video',
    group: 'block',
    defaultOptions: {
        HTMLAttributes: {
            controls: true,
            controlslist: 'nodownload',
            class: 'jt-rich-text__video',
        },
    },
    addAttributes() {
        return {
            src: {
                default: null,
            },
            width: {
                default: '100%',
            },
            height: {
                default: 'auto',
            },
        };
    },
    parseHTML() {
        return [
            {
                tag: 'video',
                getAttrs: (element) => {
                    const $ele = element as HTMLIFrameElement;
                    if (!($ele as HTMLElement).hasAttribute('src')) {
                        return false;
                    }
                    return {
                        width: $ele.width,
                        height: $ele.height,
                    };
                },
            },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        return ['video', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
    },
    addCommands() {
        return {
            setVideo:
                (src, options = {}) =>
                ({ tr, dispatch }) => {
                    const { selection } = tr;
                    const node = this.type.create({ ...options, src });

                    if (dispatch) {
                        tr.replaceRangeWith(selection.from, selection.to, node);
                    }
                    return true;
                },
        };
    },
});
