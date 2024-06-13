import './link.scss';
import * as React from 'react';
const { useCallback, useState } = React;
import { lang } from '../../../lang';
import { Editor } from '@tiptap/react';
import LinkSvg from '../images/Link.svg';
import { Tooltip } from '../../tooltip/tooltip';
import { useEmitFullScreen } from '../../../hooks';
import { LinkForm } from '../../linkForm/linkForm';
import { useClickContainTarget } from '../../../hooks';
import { E_PLATFORM } from '../../../interface';

export const LinkMenu = (editor: Editor, platform: E_PLATFORM) => {
    const [btnRef, setBtnRef] = useState<HTMLButtonElement | null>(null);
    const [showLinkEditor, setShowLinkEditor] = useState(false);
    useEmitFullScreen(showLinkEditor);

    const btnCallback = useCallback((node) => {
        node && setBtnRef(node as HTMLButtonElement);
    }, []);

    useClickContainTarget([btnRef, '.rich-text-comp__add-link-modal'], (flag: boolean) => {
        flag !== showLinkEditor && setShowLinkEditor(flag);
    });

    const done = useCallback(() => {
        setTimeout(() => {
            setShowLinkEditor(false);
        }, 34);
    }, []);

    const renderLinkForm = () => {
        if (!showLinkEditor) {
            return null;
        }
        const selection = editor.state.selection;
        const text = editor.state.doc.textBetween(selection.from, selection.to);
        const linkInfo = {
            text: text || '',
            title: text || '',
        };
        return (
            <LinkForm
                platform={platform}
                className="rich-text-comp__add-link-modal"
                editor={editor}
                linkInfo={linkInfo}
                done={done}
            />
        );
    };

    return (
        <Tooltip title={lang('插入链接')} key="link">
            <button className="menu-item menu__add-link" onClick={() => setShowLinkEditor(true)} ref={btnCallback}>
                <img src={LinkSvg} alt="" />
                {renderLinkForm()}
            </button>
        </Tooltip>
    );
};
