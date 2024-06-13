import React from 'react';
import { Editor } from '@tiptap/react';
import { lang } from '../../lang';
import { Tooltip } from '../tooltip/tooltip';
import AlignLeftSvg from './images/AlignLeft.svg';
import AlignRightSvg from './images/AlignRight.svg';
import AlignCenterSvg from './images/AlignCenter.svg';

export const TextAlignMenu = (editor: Editor) => {
    const handle = (align: string) => {
        editor.chain().focus().setTextAlign(align).run();
    };
    return [
        <Tooltip key="text-align_left" title={lang('左对齐')}>
            <button className="menu-item" onClick={() => handle('left')}>
                <img src={AlignLeftSvg} alt="" />
            </button>
        </Tooltip>,
        <Tooltip key="text-align_right" title={lang('右对齐')}>
            <button className="menu-item" onClick={() => handle('right')}>
            <img src={AlignRightSvg} alt="" />
            </button>
        </Tooltip>,
        <Tooltip key="text-align_center" title={lang('居中对齐')}>
            <button className="menu-item" onClick={() => handle('center')}>
            <img src={AlignCenterSvg} alt="" />
            </button>
        </Tooltip>,
    ];
};
