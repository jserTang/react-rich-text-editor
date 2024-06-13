import { AnyExtension } from '@tiptap/core';
import Text from '@tiptap/extension-text';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import { Color } from '@tiptap/extension-color';
import Youtube from '@tiptap/extension-youtube';
import ListItem from '@tiptap/extension-list-item';
import TableRow from '@tiptap/extension-table-row';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import TableHeader from '@tiptap/extension-table-header';
import { IConfig } from '../interface';

import { Div } from './div/div';
import { Img } from './img/img';
import Table from './table/table';
import TableCell from './table/tableCell';
import { Video } from './video/video';
import { Anchor } from './anchor/anchor';
import { Iframe } from './iframe/iframe';
import { Section } from './section/section';
import Paragraph from './paragraph/paragraph';
import { TextStyle } from './textStyle/textStyle';
import { EventHandler } from './eventHandler/eventHandler';

export const getExtensions = (config?: IConfig, pushExtensions: AnyExtension[] = []) => {
    const extensions = [
        StarterKit,
        Text,
        Heading,
        Underline,
        Color.configure({ types: [TextStyle.name, ListItem.name] }),
        TextAlign.configure({
            types: ['heading', 'paragraph', 'section', 'div'],
        }),
        Highlight.configure({
            multicolor: true,
        }),
        Youtube.configure({
            disableKBcontrols: true,
        }),

        Div,
        Video,
        Iframe,
        Section,
        TextStyle,
        Paragraph,
        TableRow,
        TableCell,
        TableHeader,
        Img.configure({
            HTMLAttributes: {
                class: 'jt-rich-text__image',
            },
        }),
        Anchor.configure({
            autolink: true,
            openOnClick: false,
            HTMLAttributes: {
                class: 'jt-rich-text__link',
            },
            validate: (href: string) => /^https?:\/\//.test(href),
        }),
        Table.configure({
            HTMLAttributes: {
                class: 'jt-rich-text__table',
            },
        }),
        EventHandler.configure({
            types: ['paragraph'],
        }),
        ...pushExtensions
    ];

    if (config?.placeholder) {
        extensions.unshift(
            Placeholder.configure({
                placeholder: config.placeholder,
            }),
        );
    }

    return extensions;
};
