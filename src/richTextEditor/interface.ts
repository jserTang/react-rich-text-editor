import { AnyExtension } from '@tiptap/core';

export interface IConfig {
    menus?: string[];
    excludeMenus?: string[];
    placeholder?: string;
    menuBarFixTop?: number;
}

export enum E_PLATFORM {
    PC = 'pc',
    mobile = 'mobile',
}

export interface IEditorProps {
    config?: IConfig;
    content?: string;
    extensions?: AnyExtension[];
    i18n?: Record<string, string>;
    onUpdate(data: { html: string; text: string }): void;
}
