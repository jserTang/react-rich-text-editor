# react-rich-text-editor

## description
Rich text editor based on react.
With superior compatibility, you can perfectly retain the text format copied from anywhere !!

## Usage
```bash
npm i jserTang@react-rich-text-editor
```

## Demo 
```bash
git clone https://github.com/jserTang/react-rich-text-editor.git
cd react-rich-text-editor
npm i && npm start
```

platform=pc
<img src="https://s2.loli.net/2024/05/31/qUaPJcszhDgA8VQ.png" style="width: 500px;" alt="PC">

platform=mobile
<img src="https://s2.loli.net/2024/05/31/CFJAaXQYgl9DZuh.png" style="width: 500px;" alt="PC">

## Example
```tsx
import { RichTextEditor } from 'jserTang@react-rich-text-editor';

const Demo = () => {
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
```

## props
- ***content***: Initial text content
- ***config***: Editor configuration; menu, placeholder are configured here
- ***extensions***:  Extension plug-ins are configured here
- ***i18n***: Configure the copy that should be displayed in the editor
- ***onUpdate***: This callback is performed when the content changes
