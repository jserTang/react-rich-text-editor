import './index.scss';
import * as React from 'react';
import { lang } from '../../lang';
import { classSet } from '../../utils';
import { ImgMenu } from './img/img';
import { LinkMenu } from './link/link';
import { VideoMenu } from './video/video';
import { defaultMenus } from '../../utils';
import { Tooltip } from '../tooltip/tooltip';
import { TextAlignMenu } from './textAlign';
import { FontSizeMenu } from './fontSize/fontSize';
import { FontColorMenu } from './fontColor/fontColor';
import { HighlightMenu } from './highlight/highlight';
import { useCurrentEditor, Editor } from '@tiptap/react';
import { E_PLATFORM } from '../../interface';
import OrderedListSvg from './images/OrderedList.svg';
import UnorderedLisSvg from './images/UnorderedList.svg';

export const MenuMap: Record<string, (editor: Editor, platform: E_PLATFORM) => JSX.Element | JSX.Element[]> = {
    undo: (editor: Editor) => (
        <Tooltip title={lang('撤销')} key="undo">
            <button
                onClick={() => editor.chain().focus().undo().run()}
                className={`menu-item ${!editor.can().chain().focus().undo().run() ? 'disabled' : ''}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                        d="M3.33301 6.82701L4.51152 5.6485L7.4578 2.70222L8.63631 3.88074L6.68369 5.83335H11.2497C14.2412 5.83335 16.6663 8.25848 16.6663 11.25C16.6663 14.2416 14.2412 16.6667 11.2497 16.6667H4.99967V15H11.2497C13.3207 15 14.9997 13.3211 14.9997 11.25C14.9997 9.17895 13.3207 7.50002 11.2497 7.50002H6.36304L8.63631 9.77329L7.4578 10.9518L4.51152 8.00553L3.33301 6.82701Z"
                        fill="#444444"
                    />
                </svg>
            </button>
        </Tooltip>
    ),
    redo: (editor: Editor) => (
        <Tooltip title={lang('重做')} key="redo">
            <button
                onClick={() => editor.chain().focus().redo().run()}
                className={`menu-item ${!editor.can().chain().focus().redo().run() ? 'disabled' : ''}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                        d="M16.667 6.827L15.4885 5.64849L12.5422 2.70221L11.3637 3.88072L13.3163 5.83334H8.75033C5.75878 5.83334 3.33366 8.25846 3.33366 11.25C3.33366 14.2415 5.75878 16.6667 8.75033 16.6667H15.0003V15H8.75033C6.67926 15 5.00033 13.3211 5.00033 11.25C5.00033 9.17894 6.67926 7.50001 8.75033 7.50001H13.637L11.3637 9.77328L12.5422 10.9518L15.4885 8.00551L16.667 6.827Z"
                        fill="#CCCCCC"
                    />
                </svg>
            </button>
        </Tooltip>
    ),
    unsetAllMarks: (editor: Editor) => (
        <Tooltip title={lang('清除格式')} key="unsetAllMarks">
            <button className="menu-item" onClick={() => editor.chain().focus().unsetAllMarks().run()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                        d="M11.8424 5.67417L5.41558 13.3333L7.28616 15H10.8161L15.7328 9.1405L11.8424 5.67417ZM12.9917 15H16.6664V16.6667H6.6664V16.6742L3.7059 14.0744C3.35334 13.7786 3.30735 13.2529 3.60319 12.9004L11.1013 3.96449C11.3971 3.61193 11.9228 3.56594 12.2753 3.86178L17.4424 8.39942C17.795 8.69525 17.841 9.22088 17.5452 9.57344L12.9917 15Z"
                        fill="#444444"
                    />
                </svg>
            </button>
        </Tooltip>
    ),
    fontSize: (editor: Editor, platform) => FontSizeMenu(editor, platform),
    bold: (editor: Editor) => (
        <Tooltip title={lang('加粗')} key="bold">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`menu-item ${editor.isActive('bold') ? 'is-active' : ''}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                        d="M5.83398 4.16667H10.8339C12.6748 4.16667 14.1672 5.65906 14.1672 7.5C14.1672 8.31634 13.8737 9.06414 13.3866 9.64366C14.3538 10.2271 15.0007 11.288 15.0007 12.5C15.0007 14.341 13.5083 15.8333 11.6674 15.8333H5.83415V10.8333H5.83398V4.16667ZM7.50095 10.8333V14.1667H11.6675C12.588 14.1667 13.3342 13.4205 13.3342 12.5C13.3342 11.5795 12.588 10.8333 11.6675 10.8333H10.8387C10.8371 10.8333 10.8355 10.8333 10.8339 10.8333L7.50095 10.8333ZM7.50078 5.83333V9.16667H10.8341C11.7545 9.16667 12.5007 8.42047 12.5007 7.5C12.5007 6.57952 11.7545 5.83333 10.8341 5.83333H7.50078Z"
                        fill="#444444"
                    />
                </svg>
            </button>
        </Tooltip>
    ),
    italic: (editor: Editor) => (
        <Tooltip title={lang('斜体')} key="italic">
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`menu-item ${editor.isActive('italic') ? 'is-active' : ''}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                        d="M11.6667 4.16666H13.3337L12.917 5.83332H11.3095L9.52381 14.1667H11.2497L10.833 15.8333H9.16667H7.5H5.83301L6.24967 14.1667H7.85714L9.64286 5.83332H7.91699L8.33366 4.16666H10H11.6667Z"
                        fill="#444444"
                    />
                </svg>
            </button>
        </Tooltip>
    ),
    underline: (editor: Editor) => (
        <Tooltip title={lang('下划线')} key="underline">
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                disabled={!editor.can().chain().focus().toggleUnderline().run()}
                className={`menu-item ${editor.isActive('underline') ? 'is-active' : ''}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                        d="M14.1659 4.16666V10C14.1659 12.3012 12.3004 14.1667 9.99919 14.1667C7.698 14.1667 5.83252 12.3012 5.83252 10V4.16666H7.49902V10C7.49902 11.3807 8.61831 12.5 9.99902 12.5C11.3797 12.5 12.499 11.3807 12.499 10V4.16666H14.1659ZM16 15.8333H4V17H16V15.8333Z"
                        fill="#444444"
                    />
                </svg>
            </button>
        </Tooltip>
    ),
    strike: (editor: Editor) => (
        <Tooltip title={lang('删除线')} key="strike">
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={`menu-item ${editor.isActive('strike') ? 'is-active' : ''}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                        d="M7.20361 13.2637C8.1665 14.055 9.31201 14.4562 10.6401 14.4673C12.2118 14.4451 13.0086 13.8835 13.0308 12.7822C13.0418 11.8802 12.5161 11.3379 11.4536 11.1553C10.9666 11.0889 10.4326 11.0142 9.85156 10.9312C8.8112 10.7596 8.01986 10.375 7.47754 9.77734C6.91862 9.16309 6.63916 8.41602 6.63916 7.53613C6.63916 6.47917 6.99056 5.62695 7.69336 4.97949C8.37402 4.33757 9.33968 4.01107 10.5903 4C12.0955 4.0332 13.4043 4.45101 14.5166 5.25342L13.4956 6.76416C12.5881 6.1665 11.5892 5.85661 10.499 5.83447C9.93457 5.83447 9.46419 5.97559 9.08789 6.25781C8.69499 6.55111 8.493 6.98828 8.48193 7.56934C8.48193 7.91797 8.61751 8.2334 8.88867 8.51562C9.15983 8.80339 9.59424 9.0026 10.1919 9.11328C10.5239 9.16862 10.9777 9.23226 11.5532 9.3042C12.6877 9.45915 13.526 9.86589 14.0684 10.5244C14.6051 11.1719 14.8735 11.9245 14.8735 12.7822C14.8127 15.0954 13.396 16.2686 10.6235 16.3018C8.83057 16.3018 7.28939 15.7484 6 14.6416L7.20361 13.2637Z"
                        fill="#444444"
                    />
                    <rect x="6" y="8" width="10" height="5" fill="white" />
                    <path d="M4 9.72266H18V11H4V9.72266Z" fill="#444444" />
                </svg>
            </button>
        </Tooltip>
    ),
    color: (editor: Editor, platform: E_PLATFORM) => FontColorMenu(editor, platform),
    highlight: (editor: Editor, platform: E_PLATFORM) => HighlightMenu(editor, platform),
    orderedList: (editor: Editor) => (
        <Tooltip title={lang('序号列表')} key="orderedList">
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`menu-item ${editor.isActive('orderedList') ? 'is-active' : ''}`}
            >
                <img src={OrderedListSvg} alt="" />
            </button>
        </Tooltip>
    ),
    bulletList: (editor: Editor) => (
        <Tooltip title={lang('项目符号列表')} key="bulletList">
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`menu-item ${editor.isActive('bulletList') ? 'is-active' : ''}`}
            >
                <img src={UnorderedLisSvg} alt="" />
            </button>
        </Tooltip>
    ),
    textAlign: TextAlignMenu,
    link: LinkMenu,
    img: (editor: Editor, platform) => ImgMenu(editor, platform),
    googleDoc: (editor: Editor) => (
        <button
            key="googleDoc"
            className="menu-item"
            onClick={() =>
                editor.commands.setIframe(
                    'https://docs.google.com/document/d/e/2PACX-1vQ-e0YCgKnQmiZV18rI98e-bB1CA182Les3vtvoMygMNkt7aooo2Pk9hwSl0FnuLcaxicCA_7vozsaM/pub?embedded=true',
                )
            }
        >
            插入 google doc
        </button>
    ),
    video: (editor: Editor, platform) => VideoMenu(editor, platform),
    hr: (editor: Editor) => (
        <Tooltip title={lang('分隔线')} key="hr">
            <button className="menu-item flex--center" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                <i className="icon-menu__hr" />
            </button>
        </Tooltip>
    ),
};

export const MenuBar = ({
    menus = defaultMenus,
    platform = E_PLATFORM.PC,
}: {
    menus?: string[];
    platform?: E_PLATFORM;
}) => {
    const { editor } = useCurrentEditor();

    if (!editor) {
        return null;
    }

    const isEmpty = editor.isEmpty;
    const isFocused = editor.isFocused;

    const onMouseDown = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT') {
            return;
        }
        e.preventDefault();
    };

    const className = classSet(
        'rich-text-menu-bar',
        'flex--start--center',
        !isFocused && isEmpty && platform === E_PLATFORM.PC ? 'blured' : '',
        `menu-bar_platform_${platform}`,
    );

    return (
        <div className={className} onMouseDown={onMouseDown}>
            {menus.map((menu, index) => {
                if (menu === 'split') {
                    return <div className="menu__split" key={index} />;
                }
                const Menu = MenuMap[menu];
                return Menu ? Menu(editor, platform) : null;
            })}
        </div>
    );
};
