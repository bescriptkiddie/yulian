import React, {useState, createContext} from 'react';
import classNames from 'classnames'
import {MenuItemProps} from './menuItem'

type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps {
    defaultIndex?: string;
    className?: string
    // 字符串字面量
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;
    defaultOpenSubMenu?: string[];
}

interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;
    defaultOpenSubMenu?: string[];

}

export const MenuContext = createContext<IMenuContext>({index: '0'});

const Menu: React.FC<MenuProps> = (props) => {
    const {className, mode, style, children, defaultIndex, onSelect, defaultOpenSubMenu} = props;
    const [currentActive, setActive] = useState(defaultIndex)
    const classes = classNames('yl-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    });
    const handleClick = (index: string) => {
        setActive(index)
        if (onSelect) {
            onSelect(index)
        }
    }
    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : '0',
        // 父传子的clock事件需要注意
        onSelect: handleClick,
        mode,
        defaultOpenSubMenu,
    }
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            // child 是一个ReactNode有很多类型,这时候我们只需要MenuItemProps相关的类型,使用类型断言
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const {displayName} = childElement.type
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                // 使用 cloneElement 拷贝 childElement,并且把需要的属性传入
                // return child
                return React.cloneElement(childElement, {
                    index: index.toString()
                })
            } else {
                console.error(" × Menu has a child which is not MenuItem component !")
            }
        })
    }
    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passedContext}>
                {/*不可以直接遍历 children 因为只是一个复杂的数据格式,用React.Children.map/forEach去遍历*/}
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenu: []
}

export default Menu
