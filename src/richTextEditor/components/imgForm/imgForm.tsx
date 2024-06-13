import * as React from 'react';
const { memo, useState } = React;
import { lang } from '../../lang';
import { Editor } from '@tiptap/react';
import { FormModal } from '../modal';
import { E_PLATFORM } from '../../interface';

interface IImgFormProps {
    editor: Editor;
    platform: E_PLATFORM;
    className?: string;
    done: VoidFunction;
}

const testUrl = (href = '') => {
    return !!href.trim();
};

export const ImgForm = memo(({ className, editor, platform, done }: IImgFormProps) => {
    const [src, setSrc] = useState('');
    const [showErr, setShowErr] = useState(false);

    const handleOk = () => {
        const hrefErr = !testUrl(src);
        if (hrefErr) {
            setShowErr(true);
            return;
        }
        editor.commands.setImage({ src });
        done();
    };

    const renderContent = () => {
        return (
            <div className="rich-text-comp__link-form">
                <div className="menu-form-item">
                    <input
                        type="text"
                        className="menu-form-item__input"
                        placeholder={lang('请输入链接地址')}
                        onChange={(e) => setSrc(e.target.value)}
                    />
                    {showErr && !testUrl(src) ? (
                        <div className="menu-form-item__err">{lang('请输入链接地址')}</div>
                    ) : null}
                </div>
            </div>
        );
    };

    return (
        <FormModal title={lang('插入图片')} onOk={handleOk} onCancel={done} className={className} platform={platform}>
            {renderContent()}
        </FormModal>
    );
});
