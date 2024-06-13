import { Affix } from 'antd';
import { Editor } from '@tiptap/core';
import React, { useMemo } from 'react';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import { defaultMenus, debounce } from '../utils';
import { getExtensions } from '../extensions';
import { MenuBar } from '../components/menus';
import { BubbleLink } from '../components/menus/bubbleLink/bubbleLink';
import { setLangMap } from '../lang';
import { IEditorProps } from '../interface';

const BubbleMenus = () => {
    const { editor } = useCurrentEditor();

    if (!editor) {
        return null;
    }

    return <BubbleLink />;
};

export default (props: IEditorProps) => {
    const { i18n, extensions, content = '', config = {} } = props;
    if (i18n) {
        setLangMap(i18n);
    }

    let menus = config?.menus || defaultMenus;
    if (Array.isArray(config?.excludeMenus)) {
        menus = defaultMenus.filter((menu) => !config.excludeMenus?.includes(menu));
    }

    const onUpdate = useMemo(
        () =>
            debounce(({ editor }: { editor: Editor }) => {
                props.onUpdate({
                    html: editor
                        .getHTML()
                        .replace(/<script/g, '&lt;script')
                        .replace(/<\/script>/g, '&lt;/script&gt;'), // 防止xss攻击
                    text: editor.getText(),
                });
            }, 300),
        [props.onUpdate],
    );

    const renderMenuBar = () => {
        if (!menus.length) {
            return null;
        }
        const menuBarFixTop = config?.menuBarFixTop;
        const menuBar = <MenuBar menus={menus} />;
        if (menuBarFixTop !== void 0) {
            return <Affix offsetTop={menuBarFixTop}>{menuBar}</Affix>;
        }
        return menuBar;
    };

    return (
        <div className="jt-rich-text-editor_tiptap">
            <EditorProvider
                slotBefore={renderMenuBar()}
                extensions={getExtensions(config, extensions)}
                onUpdate={onUpdate}
                content={content}
            >
                <BubbleMenus />
            </EditorProvider>
        </div>
    );
};
