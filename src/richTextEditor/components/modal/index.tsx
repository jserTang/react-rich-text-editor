import './index.scss';
import * as React from 'react';
import { PCModal } from './pcModal';
import { MModal } from './mModal';
export { MModal, MHalfMModal } from './mModal';
export { PCModal } from './pcModal';
import { E_PLATFORM } from '../../interface';

export const FormModal = (props: {
    onOk: VoidFunction;
    onCancel: VoidFunction;
    children: JSX.Element;
    title: string;
    platform: E_PLATFORM;
    okText?: string;
    cancelText?: string;
    className?: string;
}) => {
    if (props.platform === E_PLATFORM.mobile) {
        return <MModal {...props} />;
    }

    return <PCModal {...props} />;
};
