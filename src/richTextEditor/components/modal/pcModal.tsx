import * as React from 'react';
import { lang } from '../../lang';
import { Modal } from 'antd';

export const PCModal = ({
    onOk,
    onCancel,
    children,
    title,
    okText = lang('确认'),
    cancelText = lang('取消'),
    className,
}: {
    onOk: VoidFunction;
    onCancel: VoidFunction;
    children: JSX.Element;
    title: string;
    okText?: string;
    cancelText?: string;
    className?: string;
}) => {
    return (
        <Modal
            open
            closable
            centered
            title={title}
            okText={okText}
            maskClosable={false}
            cancelText={cancelText}
            style={{ zIndex: 9999 }}
            wrapClassName={`rich-text-comp__modal ${className}`}
            onOk={onOk}
            onCancel={onCancel}
        >
            {children}
        </Modal>
    );
};
