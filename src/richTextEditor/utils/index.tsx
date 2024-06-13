export const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && (navigator.maxTouchPoints > 1 || 'ontouchstart' in window));

export const defaultMenus = [
    'undo',
    'redo',
    'unsetAllMarks',
    'split',
    'fontSize',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'highlight',
    'split',
    'orderedList',
    'bulletList',
    'textAlign',
    'split',
    'link',
    'img',
    'video',
    'hr',
];

export const colorHistoryKey = 'jt-rich-text-color-history';
export const defaultPresetColors = [
    '#FFFFFF',
    '#980200',
    '#FF860C',
    '#FAB400',
    '#21A564',
    '#03FFFF',
    '#2196F3',
    '#9900FF',
    '#FF01FF',
    '#CCCCCC',
    '#EB7C6D',
    '#F9CB9C',
    '#FEEDC2',
    '#B5D7A8',
    '#A2C4C9',
    '#A4C2F4',
    '#DAD1EA',
    '#EBD2DB',
    '#999999',
    '#DD4E40',
    '#E69138',
    '#E0A024',
    '#51A84F',
    '#45808E',
    '#6D9EEB',
    '#8E7BC3',
    '#C27BA0',
    '#666666',
    '#85210C',
    '#B45F06',
    '#A97A00',
    '#24761D',
    '#134F5C',
    '#1455CB',
    '#361C75',
    '#751A48',
    '#000000',
    '#5B0F00',
    '#783F06',
    '#715200',
    '#1E4F12',
    '#0C343D',
    '#1E4586',
    '#21124D',
    '#4D1130',
];

export const isValidColor = (color: string) => {
    const otpNode = new Option();
    otpNode.style.color = color;
    const usedColor = otpNode.style.color;
    otpNode.remove();
    return usedColor;
};

export const rgbStringToHex = (rgbString: string) => {
    if (!isValidColor(rgbString)) {
        return '';
    }
    if (rgbString.startsWith('#')) {
        return rgbString.toUpperCase();
    }
    const regex = /rgb\((\d+), (\d+), (\d+)\)/;
    const match = rgbString.match(regex);
    if (!match) {
        return '';
    }

    const r = parseInt(match[1], 10);
    const g = parseInt(match[2], 10);
    const b = parseInt(match[3], 10);

    // 将 RGB 分量值转换为十六进制，并拼接成 HEX 颜色值
    const componentToHex = (c: number) => {
        const hex = c.toString(16);
        return hex.length == 1 ? '0' + hex : hex;
    };

    const hexR = componentToHex(r);
    const hexG = componentToHex(g);
    const hexB = componentToHex(b);

    const hexColor = '#' + hexR + hexG + hexB;
    return hexColor.toUpperCase();
};

const unsupportStyles = ['font-family', 'mso-'];
const checkUnsupportStyle = (k?: string, v?: string) => {
    if (!k || !v) {
        return false
    }
    if (k === 'background-image' && v.startsWith('url(') && !v.endsWith(')')) {
        return false;
    }
    if (unsupportStyles.some((s) => k.includes(s))) {
        return false;
    }
    return true;
};

export function parseStyle(styleString: string = '') {
    const styles: Record<string, string> = {};
    const styleStrs = styleString.split(';');

    for (let i = 0; i < styleStrs.length; i++) {
        const style = styleStrs[i];
        const splitIndex = style.indexOf(':');
        const key = style.slice(0, splitIndex);
        const value = style.slice(splitIndex + 1);
        const k = key.trim();
        const v = value.trim();
        if (checkUnsupportStyle(k, v)) {
            styles[k] = v.replace(/pt/g, 'px');
        }
    }

    return styles;
}

export function getStringStyle(style: Record<string, string>) {
    return Object.entries(style)
        .map(([key, value]) => `${key}: ${value}`)
        .join(';');
}

export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout> | null;

    return function (...args: Parameters<T>) {
        if (timeout !== null) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            func(...args);
        }, wait);
    };
}

export function classSet(...args: Array<Record<string, boolean> | string | undefined>): string {
    let names: string = '';
    const classNames = args[0];
    if (typeof classNames === 'object') {
        const nameMap = classNames;
        for (const name in nameMap) {
            if (nameMap.hasOwnProperty(name) && nameMap[name]) {
                names += name + ' ';
            }
        }
    } else {
        const nameList = args;
        for (let i = 0; i < nameList.length; i++) {
            if (nameList[i]) {
                names += nameList[i] + ' ';
            }
        }
    }

    return names.trim();
}
