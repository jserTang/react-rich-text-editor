import './img.scss';
import * as React from 'react';
const { useCallback, useState } = React;
import { lang } from '../../../lang';
import { Editor } from '@tiptap/react';
import { Tooltip } from '../../tooltip/tooltip';
import { useEmitFullScreen } from '../../../hooks';
import { ImgForm } from '../../imgForm/imgForm';
import { useClickContainTarget } from '../../../hooks';
import { E_PLATFORM } from '../../../interface';
import AddPictureSvg from '../images/AddPicture.svg';

export const ImgMenu = (editor: Editor, platform: E_PLATFORM) => {
    const [btnRef, setBtnRef] = useState<HTMLButtonElement | null>(null);
    const [showLinkEditor, setShowLinkEditor] = useState(false);
    useEmitFullScreen(showLinkEditor);

    const btnCallback = useCallback((node) => {
        node && setBtnRef(node as HTMLButtonElement);
    }, []);

    useClickContainTarget([btnRef, '.rich-text-comp__add-img-modal'], (flag: boolean) => {
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
        return <ImgForm platform={platform} className="rich-text-comp__add-img-modal" editor={editor} done={done} />;
    };

    return (
        <Tooltip title={lang('插入图片')} key="link">
            <button className="menu-item menu__add-img" onClick={() => setShowLinkEditor(true)} ref={btnCallback}>
                <img src={AddPictureSvg} alt="" />
                {renderLinkForm()}
            </button>
        </Tooltip>
    );
};
