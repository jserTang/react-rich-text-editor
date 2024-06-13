import BasicListItem from '@tiptap/extension-list-item';

export const ListItem = BasicListItem.extend({
    name: 'listItem',

    content: 'paragraph block*',
});
