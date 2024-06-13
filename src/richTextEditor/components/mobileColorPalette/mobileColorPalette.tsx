import './mobileColorPalette.scss';
import React from 'react';
import { lang } from '../../lang';
import { defaultPresetColors } from '../../utils';

interface IProps {
    onSelected: (color: string) => void;
    onClear: VoidFunction;
    defaultColor?: string;
    presetColors?: string[];
}

export const MobileColorPalette = (props: IProps) => {
    const defaultColor = props.defaultColor || 'clear';
    const presetColors = props.presetColors || defaultPresetColors;

    const onSelected = (color: string) => {
        if (color === 'clear') {
            props.onClear();
            return;
        }
        props.onSelected(color);
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
                className={`rich-text-comp__m-color-palette__item ${isClear ? 'clear' : ''}`}
                onClick={() => onSelected(color)}
            />
        );
    };

    const renderHistory = () => {
        return (
            <div className="rich-text-comp__m-color-palette__history flex--start--center">
                <div className="palette-title">{lang('默认')}</div>
                {renderColorItem(defaultColor, 'border')}
            </div>
        );
    };

    return (
        <div className="rich-text-comp__m-color-palette">
            {renderHistory()}
            <div className="rich-text-comp__m-color-palette__preset">
                <ul className="clearfix">{presetColors.map((item) => renderColorItem(item, 'preset'))}</ul>
            </div>
        </div>
    );
};
