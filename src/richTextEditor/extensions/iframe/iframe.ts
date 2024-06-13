import './iframe.scss';
import { Node, nodePasteRule, PasteRuleMatch } from '@tiptap/core';
import { getIframeAttr, iframeClass, getIframSrc, extractIframes } from './util';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        iframe: {
            setIframe: (src: string, options?: { class?: string; width?: string; height?: string }) => ReturnType;
        };
    }
}

export const Iframe = Node.create({
    name: 'iframe',
    group: 'block',
    priority: 99,
    defaultOptions: {},
    addAttributes() {
        return {
            src: {
                default: null,
            },
            width: {
                default: '100%',
            },
            height: {
                default: '80vh',
            },
            class: {
                default: iframeClass,
            },
            allowFullScreen: {
                default: true,
            },
        };
    },
    parseHTML() {
        return [
            {
                tag: 'iframe',
                getAttrs: (element) => {
                    const $ele = element as HTMLIFrameElement;
                    if (!($ele as HTMLElement).hasAttribute('src')) {
                        return false;
                    }
                    return getIframeAttr($ele.src, $ele, this.editor);
                },
            },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        return ['iframe', HTMLAttributes];
    },
    addCommands() {
        return {
            setIframe:
                (url, options = {}) =>
                ({ tr, dispatch, editor }) => {
                    const { selection } = tr;
                    const src = getIframSrc(`${url}/`);
                    const node = this.type.create({
                        ...options,
                        ...getIframeAttr(src, options, editor),
                    });

                    if (dispatch) {
                        tr.replaceRangeWith(selection.from, selection.to, node);
                    }
                    return true;
                },
        };
    },
    addPasteRules() {
        return [
            nodePasteRule({
                find: (text) => {
                    const foundIframes: PasteRuleMatch[] = [];
                    if (text) {
                        const iframes = extractIframes(text);
                        if (iframes.length) {
                            iframes.forEach((iframe) =>
                                foundIframes.push({
                                    text: iframe.value,
                                    data: getIframeAttr(iframe.src, iframe, this.editor),
                                    index: iframe.index,
                                }),
                            );
                        }
                    }

                    return foundIframes;
                },
                type: this.type,
                getAttributes: (match) => {
                    return {
                        src: match.data?.src,
                        width: match.data?.width,
                        height: match.data?.height,
                        class: match.data?.class,
                        allowFullScreen: match.data?.allowFullScreen,
                    };
                },
            }),
        ];
    },
});
