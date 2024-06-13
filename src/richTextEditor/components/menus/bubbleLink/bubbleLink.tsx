import './bubbleLink.scss';
import React, { useCallback, useState } from 'react';
import { BubbleMenu, useCurrentEditor } from '@tiptap/react';
import { LinkForm } from '../../../components/linkForm/linkForm';
import { E_PLATFORM } from '../../../interface';

export const BubbleLink = ({ platform = E_PLATFORM.PC }: { platform?: E_PLATFORM }) => {
    const { editor } = useCurrentEditor();
    const [showLinkEditor, setShowLinkEditor] = useState(false);

    const onDone = useCallback(() => {
        setShowLinkEditor(false);
    }, []);

    const renderLinkForm = () => {
        if (!showLinkEditor) {
            return null;
        }
        const linkInfo = editor!.getAttributes('anchor');
        linkInfo.text = editor!.state.doc.textBetween(editor!.state.selection.from, editor!.state.selection.to);
        if (!linkInfo.text || !linkInfo.href) {
            setShowLinkEditor(false);
            return null;
        }
        return <LinkForm editor={editor!} linkInfo={linkInfo} platform={platform} done={onDone} />;
    };

    if (!editor) {
        return null;
    }

    const onEdit = () => {
        editor!.chain().focus().extendMarkRange('anchor').run();
        setTimeout(() => {
            setShowLinkEditor(true);
        }, 34);
    };

    const renderMenu = () => {
        const href = editor.getAttributes('anchor').href;
        return (
            <BubbleMenu
                editor={editor}
                tippyOptions={{ duration: 100, placement: 'bottom' }}
                shouldShow={({ editor }) => {
                    return editor.isActive('anchor');
                }}
            >
                <div className="bubble-menu__link flex--center">
                    <a
                        className="bubble-menu__link__href jt-text-clamp clamp-1"
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {href}
                    </a>
                    <div className="bubble-menu__link__operas flex--start--center">
                        <button className="flex--center" onClick={onEdit}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12.2843 5.87707L5.12217 13.1111L5.18827 15.1461L7.21941 15.2121L14.3834 7.97617L12.2843 5.87707ZM15.388 3.25134C14.7414 2.6047 13.6922 2.60732 13.0488 3.25718L3.80469 12.5941L3.92851 16.4059L7.74414 16.5298L16.998 7.18307C17.6368 6.53778 17.6342 5.49755 16.9922 4.85546L15.388 3.25134Z"
                                    fill="#222222"
                                />
                            </svg>
                        </button>
                        <button
                            className="flex--center"
                            onClick={() => {
                                editor.chain().focus().extendMarkRange('anchor').unsetLink().run();
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                            >
                                <path
                                    d="M5.59206 3L4 4.21051L5.23388 5.83331H4.99935C3.1584 5.83331 1.66602 7.3257 1.66602 9.16665V10.8333C1.66602 12.6743 3.1584 14.1666 4.99935 14.1666L8.33333 14.1666V12.5H5C4.07952 12.5 3.33333 11.7538 3.33333 10.8333V9.16665C3.33333 8.24617 4.07953 7.49998 5 7.49998H6.50112L7.76835 9.16665H6.66667V10.8333H9.03559L13.0788 16.151L14.6709 14.9405L5.59206 3ZM14.8152 12.5L15.9727 14.0223C17.3388 13.6058 18.3327 12.3356 18.3327 10.8333V9.16665C18.3327 7.3257 16.8403 5.83331 14.9993 5.83331H11.6667V7.49998H15C15.9205 7.49998 16.6667 8.24617 16.6667 9.16665V10.8333C16.6667 11.7538 15.9205 12.5 15 12.5H14.8152ZM12.2808 9.16665L13.3333 10.551V9.16665H12.2808Z"
                                    fill="#222222"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </BubbleMenu>
        );
    };

    return (
        <div>
            {renderMenu()}
            {renderLinkForm()}
        </div>
    );
};
