import './fontSize.scss';
import * as React from 'react';
const { useCallback, useEffect, useState } = React;
import { lang } from '../../../lang';
import { isMobile } from '../../../utils';
import { Editor } from '@tiptap/react';
import { Tooltip } from '../../tooltip/tooltip';
import { MHalfMModal } from '../../modal/mModal';
import { E_PLATFORM } from '../../../interface';
import { Select } from 'antd';

const getSizeList = () => {
    return [10, 12, 14, 15, 16, 17, 18, 20, 24].map((i) => ({ value: `${i}`, label: i + 'px' }));
};

export const FontSizeMenu = (editor: Editor, platform: E_PLATFORM) => {
    const [fontSize, setFontSize] = useState('14');
    const sizeList = React.useMemo(() => getSizeList(), []);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        editor.on('selectionUpdate', () => {
            const fontSize = editor.getAttributes('textStyle').fontSize;
            setFontSize(fontSize || '14');
        });
    }, []);

    const onSelect = (size: string) => {
        editor.commands.setFontSize(size);
        setFontSize(size);
    };

    const renderOption = useCallback((option: any) => {
        return <div style={{ fontSize: option.data.label }}>{option.data.label}</div>;
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

    const onSelectedModal = (size: string) => {
        onSelect(size);
        onCloseModal();
    };

    const renderMobileModal = () => {
        if (!showModal) {
            return null;
        }
        return (
            <MHalfMModal className="font-size-modal_mobile" title={lang('请选择字体大小')} onClose={onCloseModal}>
                <div className="font-size-list">
                    {sizeList.map((size) => (
                        <div
                            key={size.value}
                            className={`font-size-item flex--start--center ${size.value === fontSize ? 'active' : ''}`}
                            onClick={() => onSelectedModal(size.value)}
                        >
                            <svg id="icon-Complete" viewBox="0 0 1024 1024">
                                <path d="M325.2736 732.16l72.448 72.448L470.1184 732.16l454.9632-455.0144L852.6848 204.8l-454.9632 454.9632-222.9248-222.8736L102.4 509.2864l222.8736 222.9248z"></path>
                            </svg>
                            <div className="font-size-item__label" style={{ fontSize: size.label }}>
                                {size.label}
                            </div>
                        </div>
                    ))}
                </div>
            </MHalfMModal>
        );
    };

    if (platform === E_PLATFORM.mobile) {
        return (
            <button className="menu-item menu__font-size" key="fontSize-m" onClick={onChoose}>
                {`${fontSize}px`}
                {renderMobileModal()}
            </button>
        );
    }

    return (
        <Tooltip title={lang('字号')} placement="top" key="fontSize">
            <div className="menu-item menu__font-size">
                <Select
                    placeholder={lang('字号')}
                    options={sizeList}
                    defaultValue="14"
                    style={{ width: 90 }}
                    onSelect={onSelect}
                    optionRender={renderOption}
                />
            </div>
        </Tooltip>
    );
};
