import React, {useContext} from 'react';
import classNames from 'classnames'
import {MenuContext} from './Menu'


export interface MenuItemProps {
    index?: number; // 利用 CloneElement 复制,不用每次都传入index
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
    const {index, disabled, className, style, children} = props;
    const context = useContext(MenuContext)
    const classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    });
    const handleClick = () => {
        if (context.onSelect && !disabled && (typeof index === 'number')) {
            context.onSelect(index) // 取消可选之后,这里会报错,因为存在undefined类型
        }
    }

    return (
        <li className={classes} style={style} onClick={handleClick}>
            {children}
        </li>
    )
}
// FC方法内有displayName 属性
MenuItem.displayName = 'MenuItem'
export default MenuItem
