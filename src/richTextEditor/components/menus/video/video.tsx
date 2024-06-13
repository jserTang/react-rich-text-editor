import './video.scss';
import * as React from 'react';
const { useCallback, useState } = React;
import { lang } from '../../../lang';
import { Editor } from '@tiptap/react';
import VideoSvg from '../images/Video.svg';
import { Tooltip } from '../../tooltip/tooltip';
import { useEmitFullScreen } from '../../../hooks';
import { VideoForm } from '../../videoForm/videoForm';
import { useClickContainTarget } from '../../../hooks';
import { E_PLATFORM } from '../../../interface';

export const VideoMenu = (editor: Editor, platform = E_PLATFORM.PC) => {
    const [showVideoForm, setShowVideoForm] = useState(false);
    const [btnRef, setBtnRef] = useState<HTMLButtonElement | null>(null);
    useEmitFullScreen(showVideoForm);

    const btnCallback = useCallback((node) => {
        node && setBtnRef(node as HTMLButtonElement);
    }, []);

    useClickContainTarget(
        [btnRef, '.rich-text-comp__add-video-modal', '.jt-video-selector-modal', '.pagination-bar'],
        (flag: boolean) => {
            setShowVideoForm(flag);
        },
    );

    const done = useCallback(() => {
        setTimeout(() => {
            setShowVideoForm(false);
        }, 34);
    }, []);

    const renderLinkForm = () => {
        if (!showVideoForm) {
            return null;
        }
        return (
            <VideoForm platform={platform} className="rich-text-comp__add-video-modal" editor={editor} done={done} />
        );
    };

    return (
        <Tooltip title={lang('插入视频')} key="video">
            <button className="menu-item menu__add-video" onClick={() => setShowVideoForm(true)} ref={btnCallback}>
                <img src={VideoSvg} alt="" />
                {renderLinkForm()}
            </button>
        </Tooltip>
    );
};
