import './colorUnderPreview.scss';
import React from 'react';

export const ColorUnderPreview = ({ color }: { color: string }) => {
    return <div className="color-under-preview" style={{ backgroundColor: color }}></div>;
};
