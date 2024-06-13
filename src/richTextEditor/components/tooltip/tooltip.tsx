import "./tooltip.scss";
import * as React from "react";

interface ITooltipProps {
    title: string;
    children: JSX.Element;
}

export const Tooltip = (props: ITooltipProps) => {
    const { children, title } = props;
    const renderTip = () => {
        return (
            <div
                className="jt-design-comp-tooltip css-dev-only-do-not-override-1l6e01l"
            >
                <div
                    className="jt-tooltip-arrow"
                ></div>
                <div className="jt-tooltip-content">
                    {title}
                </div>
            </div>
        );
    };

    return (
        <div className="tooltip-wrap">
            {renderTip()}
            {children}
        </div>
    );
};
