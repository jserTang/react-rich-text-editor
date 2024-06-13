import './linkForm.scss';

import * as React from 'react';
const { memo, useState } = React;
import { lang } from '../../lang';
import { Editor } from '@tiptap/react';
import { FormModal } from '../modal';
import { E_PLATFORM } from '../../interface';

interface ILinkFormProps {
    editor: Editor;
    linkInfo: {
        text?: string;
        title?: string;
        href?: string;
    };
    platform: E_PLATFORM;
    className?: string;
    done: VoidFunction;
}

const testHref = (href = '') => {
    return !!href.trim();
};

export const LinkForm = memo(({ className, editor, linkInfo, platform, done }: ILinkFormProps) => {
    const [newLink, setNewLink] = useState({ ...linkInfo });
    const [showErr, setShowErr] = useState(false);

    const handleOk = () => {
        const hrefErr = !testHref(newLink.href);
        const err = { text: false, href: false };
        if (hrefErr || !newLink.text) {
            if (hrefErr) {
                err.href = true;
            }
            if (!newLink.text) {
                err.text = true;
            }
            setShowErr(true);
            return;
        }
        if (linkInfo.href) {
            editor.chain().focus().editLink({ title: newLink.title, text: newLink.text, href: newLink.href! }).run();
        } else {
            editor.chain().focus().addLink({ title: newLink.title, text: newLink.text, href: newLink.href! }).run();
        }
        done();
    };

    const renderContent = () => {
        return (
            <div className="rich-text-comp__link-form">
                <div className="menu-form-item">
                    <div className="menu-form-item__label">{lang('文本内容')}</div>
                    <input
                        type="text"
                        autoFocus
                        className="menu-form-item__input"
                        placeholder={lang('请输入文本内容')}
                        defaultValue={linkInfo.text}
                        onChange={(e) => setNewLink({ ...newLink, text: e.target.value.trim() })}
                    />
                    {showErr && !newLink.text ? (
                        <div className="menu-form-item__err">{lang('请输入文本内容')}</div>
                    ) : null}
                </div>
                <div className="menu-form-item">
                    <div className="menu-form-item__label">{lang('链接地址')}</div>
                    <input
                        type="text"
                        className="menu-form-item__input"
                        placeholder={lang('请输入链接地址')}
                        defaultValue={linkInfo.href}
                        onChange={(e) =>
                            setNewLink({
                                ...newLink,
                                href: e.target.value.startsWith('http') ? e.target.value : `https://${e.target.value}`,
                            })
                        }
                    />
                    {showErr && !testHref(linkInfo.href) ? (
                        <div className="menu-form-item__err">{lang('请输入链接地址')}</div>
                    ) : null}
                </div>
                <div className="menu-form-item menu-form-item_title">
                    <div className="menu-form-item__label">{lang('标题')}</div>
                    <input
                        type="text"
                        className="menu-form-item__input"
                        placeholder={lang('请输入标题')}
                        defaultValue={linkInfo.title}
                        onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                    />
                </div>
            </div>
        );
    };

    return (
        <FormModal
            title={linkInfo.href ? lang('超链接') : lang('插入链接')}
            onOk={handleOk}
            onCancel={done}
            className={className}
            platform={platform}
        >
            {renderContent()}
        </FormModal>
    );
});
