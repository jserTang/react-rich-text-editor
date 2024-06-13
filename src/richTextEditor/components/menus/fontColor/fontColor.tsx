import './fontColor.scss';
import React from 'react';
const { Fragment, useCallback, useState } = React;
import { lang } from '../../../lang';
import { isMobile } from '../../../utils';
import { Editor } from '@tiptap/react';
import { MHalfMModal } from '../../modal/mModal';
import { Tooltip } from '../../tooltip/tooltip';
import { ColorPalette } from '../../colorPalette/colorPalette';
import { MobileColorPalette } from '../../mobileColorPalette/mobileColorPalette';
import { ColorUnderPreview } from '../../colorUnderPreview/colorUnderPreview';
import { E_PLATFORM } from '../../../interface';

export const FontColorMenu = (editor: Editor, platform: E_PLATFORM) => {
    const textStyle = editor.getAttributes('textStyle') || {};
    const color = textStyle.color || '#222222';
    const [showModal, setShowModal] = useState(false);

    const onSelected = useCallback((color) => {
        setShowModal(false);
        editor.chain().focus().setColor(color).run();
    }, []);

    const onClear = useCallback(() => {
        editor.chain().focus().unsetColor().run();
    }, []);

    const onCloseModal = useCallback(() => {
        setShowModal(false);
        editor.commands.focus();
    }, []);

    const onChoose = () => {
        setShowModal(true);
        if (isMobile) {
            editor.commands.blur();
        }
    };

    const renderMobileModal = () => {
        if (!showModal) {
            return null;
        }
        return (
            <MHalfMModal className="font-size-modal_mobile" title={lang('请选择颜色')} onClose={onCloseModal}>
                <MobileColorPalette onSelected={onSelected} onClear={onClear} defaultColor="#222222" />
            </MHalfMModal>
        );
    };

    if (platform === E_PLATFORM.mobile) {
        return (
            <Fragment key="color-m">
                <button className="menu-item menu__color flex--center" onClick={onChoose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.16465 0.333328H4.16481H5.83128H5.83145L9.99805 10.3333H8.33141L7.28975 7.83332H2.70634L1.66469 10.3333H-0.00195312L4.16465 0.333328ZM3.40077 6.16665H6.59532L4.99805 2.33313L3.40077 6.16665Z"
                            fill="#444444"
                        />
                    </svg>
                    <ColorUnderPreview color={color} />
                </button>
                {renderMobileModal()}
            </Fragment>
        );
    }

    return (
        <ColorPalette onSelected={onSelected} currentColor={color} onClear={onClear} key="color">
            <Tooltip title={lang('字体颜色')} placement="top">
                <button className="menu-item menu__color flex--center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="11" viewBox="0 0 10 11" fill="none">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.16465 0.333328H4.16481H5.83128H5.83145L9.99805 10.3333H8.33141L7.28975 7.83332H2.70634L1.66469 10.3333H-0.00195312L4.16465 0.333328ZM3.40077 6.16665H6.59532L4.99805 2.33313L3.40077 6.16665Z"
                            fill="#444444"
                        />
                    </svg>
                    <ColorUnderPreview color={color} />
                </button>
            </Tooltip>
        </ColorPalette>
    );
};
