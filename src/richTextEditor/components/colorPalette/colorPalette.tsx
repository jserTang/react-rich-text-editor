import './colorPalette.scss';
import React from 'react';
import { lang } from '../../lang';
const { useCallback, useEffect, useState } = React;
import { isValidColor, rgbStringToHex, colorHistoryKey, defaultPresetColors } from '../../utils';
import { useClickContainTarget } from '../../hooks';

interface IProps {
    children: JSX.Element;
    onClear: () => void;
    onSelected: (color: string) => void;
    currentColor: string;
    presetColors?: string[];
}

export const ColorPalette = (props: IProps) => {
    const [showPalette, setShowPalette] = useState(false);
    const [wrapNode, setWrapNode] = useState<HTMLDivElement | null>(null);
    const [customColor, setCustomColor] = useState(rgbStringToHex(props.currentColor) || '#222222');
    const [usedHistory, setUsedHistory] = useState<string[]>(JSON.parse(localStorage.getItem(colorHistoryKey) || '[]'));
    const presetColors = props.presetColors || defaultPresetColors;

    useEffect(() => {
        setCustomColor(rgbStringToHex(props.currentColor) || '#222222');
    }, [props.currentColor]);

    const wrapRef = useCallback((node) => {
        if (node) {
            setWrapNode(node);
        }
    }, []);

    useClickContainTarget(wrapNode, (flag) => {
        setShowPalette(flag);
    });

    const onSelected = (color: string) => {
        if (color === 'clear') {
            props.onClear();
        } else if (isValidColor(color)) {
            props.onSelected(color);
            const newHistory = Array.from(new Set([color, ...usedHistory])).slice(0, 8);
            setUsedHistory(newHistory);
            localStorage.setItem(colorHistoryKey, JSON.stringify(newHistory));
        }

        setShowPalette(false);
    };

    const onCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = `#${e.target.value}`;
        if (isValidColor(value)) {
            setCustomColor(value);
        }
    };

    const renderColorItem = (color: string, type: string) => {
        const isClear = color === 'clear';
        const style: Record<string, string> = { background: color };
        if (isClear || type === 'border' || color === '#FFFFFF') {
            style.border = '1px solid #E0E0E0';
        }
        return (
            <li
                key={`${type}-${color}`}
                style={style}
                className={`rich-text-comp__color-palette__item ${isClear ? 'clear' : ''}`}
                onClick={() => type !== 'custom' && onSelected(color)}
            />
        );
    };

    const renderHistory = () => {
        return (
            <div className="rich-text-comp__color-palette__history">
                <div className="palette-title">{lang('最近使用颜色')}</div>
                <ul className="clearfix">
                    {renderColorItem('clear', 'border')}
                    {usedHistory.map((item) => renderColorItem(item, 'border'))}
                </ul>
            </div>
        );
    };

    const renderColorPalette = () => {
        if (!showPalette) {
            return null;
        }
        return (
            <div className="rich-text-comp__color-palette">
                {renderHistory()}
                <div className="rich-text-comp__color-palette__preset">
                    <div className="palette-title">{lang('基本色')}</div>
                    <ul className="clearfix">{presetColors.map((item) => renderColorItem(item, 'preset'))}</ul>
                </div>
                <div className="rich-text-comp__color-palette__custom flex--center">
                    {renderColorItem(customColor, 'custom')}
                    <form
                        className="menu-form-item__form flex--1 flex--center"
                        onSubmit={() => onSelected(customColor)}
                    >
                        <span>#</span>
                        <input
                            type="text"
                            className="flex--1"
                            maxLength={6}
                            defaultValue={customColor.replace('#', '')}
                            onChange={onCustomColorChange}
                        />
                    </form>
                    {customColor ? (
                        <button className="btn-save-color" onClick={() => onSelected(customColor)}>
                            {lang('确认')}
                        </button>
                    ) : null}
                </div>
            </div>
        );
    };

    return (
        <div className="rich-text-comp__color-select" ref={wrapRef}>
            <div className="rich-text-comp__color-btn">{props.children}</div>
            {renderColorPalette()}
        </div>
    );
};
