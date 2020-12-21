import React from 'react'
import classNames from 'classnames'

export enum ButtonSize {
    Large = 'ls',
    Small = 'sm',
}

export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'
}

interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    children?: React.ReactNode;
    href?: string
}

type NativeButtonProps = BaseButtonProps & React.BaseHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.BaseHTMLAttributes<HTMLElement>  // a链接的属性
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>
const Button: React.FC<ButtonProps> = (props) => {
    const {
        className,// 用户自定义的className
        btnType,
        disabled,
        size,
        children,
        href,
        ...restProps
    } = props

    const classes = classNames('btn',className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === 'link') && disabled
    })
    if (btnType === 'link' && href) {
        return (
            <a className={classes}
               href={href}
               {...restProps}
            >
                {children}
            </a>
        )
    } else {
        return (
            <button
                className={classes}
                disabled={disabled}
                {...restProps}
            >{children}</button>
        )
    }
}

// defaultProps 用于确保没有指定值的时候,也有默认值
Button.defaultProps = {
    disabled: false,
    btnType: ButtonType.Default
}

export default Button;
