import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';

interface IEleJSON {
    tag: string;
    attributes?: Record<string, string>;
    children: Array<IEleJSON | string>;
}

function childrenAllLi(json: IEleJSON) {
    return (json.children || []).every((child) => (child as IEleJSON).tag === 'li');
}

function serializeList(json: IEleJSON) {
    const children = json.children;
    const newChildren = [];
    let superLi: IEleJSON | null = null;
    for (let i = 0; i < children.length; i++) {
        const child = children[i] as IEleJSON;
        if (typeof child === 'string' || child.tag !== 'li') {
            if (superLi) {
                superLi.children = [...superLi.children, ...(child.children || child)];
            } else {
                const li = {
                    tag: 'li',
                    children: child.children,
                };
                newChildren.push(li);
                superLi = li;
            }
        } else {
            newChildren.push(child);
            superLi = child;
        }
    }
    json.children = newChildren;
    return jsonToHTML(json);
}

const excludeTags = ['META'];

export function htmlToJSON(element: HTMLElement) {
    const obj: IEleJSON = {
        tag: element.tagName.toLowerCase(),
        attributes: {},
        children: [],
    };

    const attributes = element.attributes;
    if (attributes && attributes.length) {
        for (let i = 0; i < attributes.length; i++) {
            const attr = attributes[i];
            const nodeName = attr.nodeName;
            const nodeValue = attr.nodeValue;
            if (!nodeName.includes('-')) {
                nodeValue && (obj.attributes![nodeName] = nodeValue);
            }
        }
    }

    if (obj.tag === 'svg') {
        obj.attributes!.html = encodeURI(element.innerHTML);
    }

    const children = element.childNodes;
    if (children.length) {
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            if (excludeTags.includes(child.nodeName)) {
                continue;
            }
            if (child.nodeType === 3) {
                child.nodeValue && obj.children.push(child.nodeValue);
            } else if (child.nodeType === 1) {
                obj.children.push(htmlToJSON(child as HTMLElement));
            }
        }
    }

    return obj;
}

export function jsonToHTML(json: IEleJSON): string {
    if (Array.isArray(json)) {
        return json.map(jsonToHTML).join('');
    }

    // 处理子节点
    const isList = json.tag === 'ul' || json.tag === 'ol';
    if (isList && !childrenAllLi(json)) {
        return serializeList(json);
    }

    if (json.tag) {
        let html = `<${json.tag}`;
        if (json.attributes) {
            for (const [key, value] of Object.entries(json.attributes)) {
                html += ` ${key}="${value}"`;
            }
        }
        html += '>';
        if (json.children) {
            for (const child of json.children) {
                if (typeof child === 'string') {
                    html += child;
                } else {
                    html += jsonToHTML(child);
                }
            }
        }
        html += `</${json.tag}>`;
        return html;
    }
    return '';
}

export const EventHandler = Extension.create({
    name: 'eventHandler',

    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey('eventHandler'),
                props: {
                    transformPastedHTML(htmlString: string) {
                        htmlString = htmlString.replace(/&quot;/g, '');
                        const div = document.createElement('div');
                        div.innerHTML = htmlString;
                        const htmlJSON = htmlToJSON(div);
                        const newHtml = jsonToHTML(htmlJSON);
                        return `<p></p><section class="copied-content">${newHtml}</section><p></p>`;
                    },
                },
            }),
        ];
    },
});
