import BasicTableCell from '@tiptap/extension-table-cell';

const TableCell = BasicTableCell.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            style: {
                default: '',
            },
            valign: {
                default: '',
            },
            align: {
                default: '',
            },
        };
    },
});

export default TableCell;
