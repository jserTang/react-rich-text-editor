import './videoForm.scss';
import { lang } from '../../lang';
import * as React from 'react';
const { useState } = React;
import { Editor } from '@tiptap/react';
import { FormModal } from '../modal';
import { E_PLATFORM } from '../../interface';

interface IVideoFormProps {
    editor: Editor;
    platform: E_PLATFORM;
    visible?: boolean;
    className?: string;
    done: VoidFunction;
}

enum VIDEO_TYPE {
    UNKNOW,
    UMU,
    YOUTUBE,
    IFRAME,
}

const isValidYoutubeUrl = (src: string) => {
    return (
        src.startsWith('https://youtu.be') ||
        src.startsWith('https://www.youtube.com/watch') ||
        src.startsWith('https://www.youtube.com/embed')
    );
};
const isValidQQUrl = (src: string) => {
    return /^https:\/\/v\.qq\.com/.test(src);
};
const isValidBilibiliUrl = (src: string) => {
    return /^https:\/\/www\.bilibili\.com\/video/.test(src) || /^https:\/\/player\.bilibili\.com/.test(src);
};
const isValidVimeoUrl = (src: string) => {
    return /^https:\/\/vimeo\.com/.test(src) || /^https:\/\/player\.vimeo\.com/.test(src);
};
const isValidMicrosoftstreamUrl = (src: string) => {
    return /^https:\/\/web\.microsoftstream\.com\/video/.test(src);
};

const getVideoFrom = (src: string) => {
    if (isValidYoutubeUrl(src)) {
        return VIDEO_TYPE.YOUTUBE;
    }
    if (isValidQQUrl(src) || isValidBilibiliUrl(src) || isValidVimeoUrl(src) || isValidMicrosoftstreamUrl(src)) {
        return VIDEO_TYPE.IFRAME;
    }
    return VIDEO_TYPE.UNKNOW;
};

// 'https://statics-jt-test.umucdn.cn/resource/T/GYIT/r4Uuu/transcoding/455577548.mov.mp4'
// 'https://vimeo.com/930155433?share=copy'
// 'https://v.qq.com/x/page/f3544ki3yqj.html?url_from=share'
// 'https://www.bilibili.com/video/BV1nt42157XS/?spm_id_from=333.1007.tianma.1-2-2.click'
// 'https://www.youtube.com/embed/3lTUAWOgoHs?controls=0'

export const VideoForm = ({ className, editor, platform, done }: IVideoFormProps) => {
    const [video, setVideo] = useState({
        src: '',
        from: VIDEO_TYPE.UMU,
    });

    const validateVideo = () => {
        const src = video.src;
        if (!src || !src.startsWith('http')) {
            return false;
        }
        return true;
    };

    const handleOk = () => {
        const src = video.src;
        const videoType = video.from;
        if (!validateVideo()) {
            done();
            return;
        }
        if (videoType === VIDEO_TYPE.YOUTUBE) {
            editor.commands.setYoutubeVideo({ src });
        } else {
            editor.commands.setIframe(src, { width: '100%' });
        }
        done();
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const src = e.target.value.trim();
        setVideo({
            src,
            from: getVideoFrom(src),
        });
    };

    return (
        <>
            <FormModal
                onOk={handleOk}
                onCancel={done}
                title={lang('插入视频')}
                okText={lang('确认')}
                cancelText={lang('取消')}
                platform={platform}
                className={className}
            >
                <div className="rich-text-comp__video-form">
                    <div className="menu-form-item">
                        <div className="menu-form-item__label flex--start--center">{lang('视频链接地址')}</div>
                        <input
                            className="menu-form-item__input"
                            type="text"
                            onChange={onInputChange}
                            autoFocus
                            placeholder={lang('请输入视频链接地址')}
                        />
                    </div>
                </div>
            </FormModal>
        </>
    );
};
