import React from 'react';
import { Editor, Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react';
import { parseStyle } from '../../utils';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        svg: {};
    }
}
export interface IReactNodeProps {
    editor: Editor;
    children: any;
    selected: boolean;
    node: { attrs: { [key: string]: any }; [key: string]: any };
    getPos: () => number;
    deleteNode: () => void;
    updateAttributes: (attrs: { [key: string]: any }) => void;
}

const NodeComponent = (props: IReactNodeProps) => {
    return (
        <NodeViewWrapper className="jt-rich-text__svg">
            <svg
                {...props.node.attrs}
                style={parseStyle(props.node.attrs.style)}
                dangerouslySetInnerHTML={{ __html: decodeURI(props.node.attrs.html || '') }}
            ></svg>
        </NodeViewWrapper>
    );
};

export const Svg = Node.create({
    name: 'svg',
    group: 'block',
    content: 'block*',
    addAttributes() {
        return {
            xmlns: {
                default: '',
            },
            version: {
                default: '1.1',
            },
            viewBox: {
                default: '',
            },
            style: {
                default: '',
            },
            html: {
                default: '',
            },
            x: {
                default: null,
            },
            y: {
                default: null,
            },
        };
    },
    parseHTML() {
        return [
            {
                tag: 'svg',
            },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        return ['svg', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
    },
    addNodeView() {
        return ReactNodeViewRenderer(NodeComponent);
    },
});
