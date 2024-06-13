import { Editor } from '@tiptap/core';
import React, { useMemo } from 'react';
import { EditorProvider, useCurrentEditor, BubbleMenu } from '@tiptap/react';
import { MenuBar } from '../components/menus';
import { defaultMenus, debounce } from '../utils';
import { getExtensions } from '../extensions';
import { BubbleLink } from '../components/menus/bubbleLink/bubbleLink';
import { E_PLATFORM } from '../interface';
import { setLangMap } from '../lang';
import { IEditorProps } from '../interface';

const BubbleMenus = ({ menus, platform }: { menus: string[]; platform: E_PLATFORM }) => {
    const { editor } = useCurrentEditor();

    if (!editor || !menus.length) {
        return null;
    }

    const bubbleMenuWidth = (editor.view.dom.clientWidth || document.body.clientWidth) - 38;
    return (
        <>
            <BubbleLink platform={platform} />
            <BubbleMenu
                editor={editor}
                tippyOptions={{ placement: 'bottom', maxWidth: bubbleMenuWidth }}
                shouldShow={({ editor }) => {
                    return !editor.isActive('anchor');
                }}
            >
                <MenuBar menus={menus} platform={E_PLATFORM.mobile} />
            </BubbleMenu>
        </>
    );
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
                const content = {
                    html: editor
                        .getHTML()
                        .replace(/<script/g, '&lt;script')
                        .replace(/<\/script>/g, '&lt;/script&gt;'), // 防止xss攻击,
                    text: editor.getText(),
                };
                props.onUpdate(content);
            }, 300),
        [props.onUpdate],
    );

    return (
        <div className={`jt-rich-text-editor_tiptap mobile`}>
            <EditorProvider
                slotBefore={<BubbleMenus menus={menus} platform={E_PLATFORM.mobile} />}
                extensions={getExtensions(config, extensions)}
                onUpdate={onUpdate}
                content={content}
            >
                <div></div>
            </EditorProvider>
        </div>
    );
};
