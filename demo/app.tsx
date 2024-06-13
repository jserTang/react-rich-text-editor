import './app.scss';
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { RichTextEditor, defaultMenus } from '../src';

const APP = () => {
    const defaultContent = 'default content!';
    const config = {
        menuBarFixTop: 0,
        menus: defaultMenus,
        placeholder: 'This is placeholder',
    };

    const onUpdate = (data: { html: string; text: string }) => {
        console.log(data.html);
    };

    return <RichTextEditor config={config} content={defaultContent} onUpdate={onUpdate} />;
}

const root = createRoot(document.querySelector('#root') as Element);
root.render(<APP/>);
