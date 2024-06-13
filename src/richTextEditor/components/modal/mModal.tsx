import * as React from 'react';
import ReactDOM from 'react-dom';
import { lang } from '../../lang';

export const MModal = ({
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
    return ReactDOM.createPortal(
        <div
            className={`cover-page-portal m-rich-portal-form ${className} flex--center`}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="cover-page-portal__content">
                <div className="m-rich-portal-form__header flex--between--center">
                    <button className="cancel" onClick={onCancel}>
                        {cancelText}
                    </button>
                    <div className="page-header__title">{title}</div>
                    <button className="submit" onClick={onOk}>
                        {okText}
                    </button>
                </div>
                <div className="m-rich-portal-form__body flex--1">{children}</div>
            </div>
        </div>,
        document.body,
    );
};

export const MHalfMModal = ({
    title,
    children,
    className,
    onClose,
}: {
    title: string;
    children: JSX.Element;
    onClose: VoidFunction;
    className?: string;
}) => {
    const closeHandle = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClose();
    };

    return ReactDOM.createPortal(
        <div className={`cover-page-portal m-rich-portal-half ${className} flex--center`} onClick={closeHandle}>
            <div className="cover-page-portal__content" onClick={(e) => e.stopPropagation()}>
                <div className="m-rich-portal-half__header flex--between--center">
                    <div className="m-rich-portal-half__header__title flex--1">{title}</div>
                    <button className="m-rich-portal-half__header__close flex--center" onClick={closeHandle}>
                        <svg id="icon-Close" viewBox="0 0 1024 1024">
                            <path d="M515.6352 443.2384L225.9968 153.6 153.6 225.9968l289.6384 289.6384L153.6 805.2736l72.3968 72.3968 289.6384-289.6384 289.6384 289.6384 72.3968-72.3968-289.6384-289.6384 289.6384-289.6384L805.2736 153.6 515.584 443.2384z"></path>
                        </svg>
                    </button>
                </div>
                {children}
            </div>
        </div>,
        document.body,
    );
};
