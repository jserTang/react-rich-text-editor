import './highlight.scss';
import React from 'react';
const { Fragment, useCallback, useState } = React;
import { lang } from '../../../lang';
import { isMobile } from '../../../utils';
import { Editor } from '@tiptap/react';
import { Tooltip } from '../../tooltip/tooltip';
import { MHalfMModal } from '../../modal/mModal';
import { ColorPalette } from '../../colorPalette/colorPalette';
import { MobileColorPalette } from '../../mobileColorPalette/mobileColorPalette';
import { ColorUnderPreview } from '../../colorUnderPreview/colorUnderPreview';
import { E_PLATFORM } from '../../../interface';

const icon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="11" viewBox="0 0 12 10" fill="none">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.04627 7.78616C1.48937 7.2492 1.48937 6.37862 2.04627 5.84165L7.68721 0.40272C8.24412 -0.134241 9.14703 -0.134239 9.70394 0.402721L11.5823 2.21384C12.1392 2.7508 12.1392 3.62139 11.5823 4.15835L5.94138 9.59728C5.38448 10.1342 4.48156 10.1342 3.92466 9.59728L3.76932 9.44751L3.35539 9.84662H0L2.09163 7.82989L2.04627 7.78616ZM2.87669 6.64233C2.77841 6.73709 2.77841 6.89072 2.87669 6.98548L4.75507 8.7966C4.85335 8.89136 5.01269 8.89136 5.11097 8.7966L7.94798 6.06118C7.87421 6.02404 7.80497 5.9756 7.74301 5.91586L5.86462 4.10474C5.80259 4.04493 5.7523 3.97808 5.71376 3.90686L2.87669 6.64233Z"
            fill="#444444"
        />
    </svg>
);

export const HighlightMenu = (editor: Editor, platform: E_PLATFORM) => {
    const [showModal, setShowModal] = useState(false);
    const textStyle = editor.getAttributes('textStyle') || {};
    const highlightStyle = editor.getAttributes('highlight') || {};
    const color = highlightStyle.color || textStyle.backgroundColor || '#FFFFFF';

    const onClear = useCallback(() => {
        editor.chain().focus().unsetHighlight().run();
        // 兼容老编辑器的标记
        editor.chain().focus().unsetBackgroundColor().run();
    }, []);

    const onSelected = useCallback((newColor) => {
        setShowModal(false);
        if (newColor) {
            editor.chain().focus().setHighlight({ color: newColor }).run();
        } else {
            onClear();
        }
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
                <MobileColorPalette onSelected={onSelected} onClear={onClear} defaultColor="clear" />
            </MHalfMModal>
        );
    };

    if (platform === E_PLATFORM.mobile) {
        return (
            <Fragment key="highlight-m">
                <button className="menu-item menu__highlight flex--center" onClick={onChoose}>
                    {icon}
                    <ColorUnderPreview color={color} />
                </button>
                {renderMobileModal()}
            </Fragment>
        );
    }

    return (
        <ColorPalette onSelected={onSelected} currentColor={color} onClear={onClear} key="highlight">
            <Tooltip title={lang('背景颜色')} placement="top">
                <button className="menu-item menu__highlight flex--center">
                    {icon}
                    <ColorUnderPreview color={color} />
                </button>
            </Tooltip>
        </ColorPalette>
    );
};
