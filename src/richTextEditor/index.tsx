import './style/base.scss';
import './style/layout.scss';
import React from 'react';
import PCRichTextEditor from './pc';
import MobileRichTextEditor from './mobile';
import { useFullScreen } from './hooks';
import { IEditorProps } from './interface';
export { defaultMenus } from './utils';

export { PCRichTextEditor, MobileRichTextEditor, useFullScreen };

const RichTextEditor = (props: IEditorProps & { platform?: 'pc' | 'mobile' }) => {
    const platform = props.platform || 'pc';
    if (platform === 'pc') {
        return <PCRichTextEditor {...props} />;
    }
    return <MobileRichTextEditor {...props} />;
};

export default RichTextEditor;