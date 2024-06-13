import { Editor } from '@tiptap/core';
export const supportVideoDomain = ['v.qq.com', 'bilibili.com', 'vimeo.com', 'youtu.be', 'youtube.com'];
export const supportDomain = [...supportVideoDomain, 'docs.google.com'];

export const isVideoSrc = (src: string) => {
    return supportVideoDomain.some((type) => src.includes(type));
};

export const iframeClass = 'jt-rich-text__iframe';

function replaceVimeoUrl(url: string) {
    if (url.includes('player.vimeo.com')) {
        return url;
    }
    const urlObject = new URL(url);
    const videoId = urlObject.pathname.split('/').pop();
    return `https://player.vimeo.com/video/${videoId}?badge=0`;
}

function replaceQQVideoUrl(url: string) {
    if (url.includes('iframe/player.html')) {
        return url;
    }
    const regex = /\/([a-zA-Z0-9]+)\.html/;
    const match = url.match(regex);
    if (match && match[1]) {
        const videoId = match[1];
        return `https://v.qq.com/txp/iframe/player.html?vid=${videoId}`;
    } else {
        return url;
    }
}

function replaceBilibiliUrl(url: string) {
    if (url.includes('player.bilibili.com')) {
        return url;
    }
    const regex = /\/(BV[a-zA-Z0-9]+)\//;
    const match = url.match(regex);
    if (match && match[1]) {
        const bvNumber = match[1];
        return `https://player.bilibili.com/player.html?bvid=${bvNumber}`;
    } else {
        return url;
    }
}

export const getIframSrc = (originalUrl: string) => {
    if (originalUrl.includes('vimeo.com')) {
        return replaceVimeoUrl(originalUrl);
    }
    if (originalUrl.includes('v.qq.com')) {
        return replaceQQVideoUrl(originalUrl);
    }
    if (originalUrl.includes('bilibili.com')) {
        return replaceBilibiliUrl(originalUrl);
    }
    return originalUrl;
};

export function extractIframes(htmlString: string) {
    const iframes = [];
    const regex = /<iframe[^>]*\bsrc="([^"]+)"[^>]*>.*?<\/iframe>/g;
    let match;
    while ((match = regex.exec(htmlString)) !== null) {
        const value = match[0];
        const width = (value.match(/width="(\d+)"/) || [])[1];
        const height = (value.match(/height="(\d+)"/) || [])[1];
        iframes.push({
            value,
            src: match[1],
            width,
            height,
            index: match.index,
        });
    }
    return iframes;
}

export const getIframeAttr = (
    src: string,
    option: {
        width?: string;
        height?: string;
    },
    editor?: Editor,
) => {
    const isVideo = isVideoSrc(src);
    const allowFullScreen = !!isVideo;
    let wrapWidth = document.querySelector('.jt-rich-text-editor_tiptap')?.clientWidth;
    if (editor && editor.view?.dom) {
        wrapWidth = editor.view.dom.clientWidth;
    } else {
        !wrapWidth && (wrapWidth = document.body.clientWidth);
    }
    const defaultVideoHeight = Math.min(480, Math.floor(((wrapWidth - 32) * 9) / 16));
    const height = option.height || (isVideo ? `${defaultVideoHeight}px` : `${Math.floor(window.innerHeight * 0.7)}px`);

    return {
        width: option.width || '100%',
        height,
        src,
        allowFullScreen,
        class: `${iframeClass} ${isVideo ? 'iframe-video' : ''}`,
    };
};
