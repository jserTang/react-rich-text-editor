import { mergeAttributes } from '@tiptap/core';
import { DOMOutputSpec } from '@tiptap/pm/model';
import { NodeView } from '@tiptap/pm/view';
import BasicTable, { createColGroup } from '@tiptap/extension-table';

export interface TableOptions {
    HTMLAttributes: Record<string, any>;
    resizable: boolean;
    handleWidth: number;
    cellMinWidth: number;
    View: NodeView;
    lastColumnResizable: boolean;
    allowTableNodeSelection: boolean;
}

const filterAttrs = (ele: HTMLElement) => {
    const attrs: Record<string, any> = {};
    const style = ele.style.cssText?.trim();
    style && (attrs.style = style);
    ele.className && (attrs.class = ele.className);
    return attrs;
};

const Table = BasicTable.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            width: {
                default: '100%',
            },
            class: {
                default: '',
            },
            style: {
                default: '',
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'table',
                getAttrs: (element) => {
                    return filterAttrs(element as HTMLTableElement);
                },
            },
        ];
    },

    renderHTML({ node, HTMLAttributes }) {
        const { colgroup } = createColGroup(node, this.options.cellMinWidth);
        const table: DOMOutputSpec = [
            'table',
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
            colgroup,
            ['tbody', 0],
        ];
        return table;
    },
});

export default Table;
