import React from 'react'
import {render, RenderResult, fireEvent, cleanup, waitFor} from '@testing-library/react'

import Menu, {MenuProps} from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const testProps: MenuProps = {
    defaultIndex: '0',
    onSelect: jest.fn(),
    className: 'test',
}

const testVertical: MenuProps = {
    defaultIndex: '0',
    mode: 'vertical',
    defaultOpenSubMenu: ['4']
}

const getMenu = (props: MenuProps) => {
    return (
        <Menu {...props} >
            <MenuItem> active </MenuItem>
            <MenuItem disabled> disabled </MenuItem>
            <MenuItem> hello </MenuItem>
            <SubMenu title='dropdown'>
                <MenuItem>
                    drop1
                </MenuItem>
            </SubMenu>
            <SubMenu title="opened">
                <MenuItem>
                    opened1
                </MenuItem>
            </SubMenu>
        </Menu>
    )
}

const createStyleFile = () => {
    const cssFile: string = `
        .yl-submenu {
            display:none;
        }
        .yl-submenu.menu-opened {
            display:block;
        }
    `
    const style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = cssFile
    return style
}

let wrapper: RenderResult, wrapper2: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement,
    disabledElement: HTMLElement

describe('test Menu and MenuItem', () => {
    // 一个钩子,在每个case之前都会跑
    beforeEach(() => {
        wrapper = render(getMenu(testProps))
        // 插入Css File
        wrapper.container.append(createStyleFile())
        // 因为测试案例要求贴近使用者最真实的使用方法,所以通过渲染元素的内容去取得节点,官方推荐在最外层元素调用testId,然后通过api去获取内容
        menuElement = wrapper.getByTestId('test-menu');
        activeElement = wrapper.getByText('active');
        disabledElement = wrapper.getByText('disabled');
    })
    it('should render default props', () => {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('yl-menu test')
        // expect(menuElement.getElementsByTagName('li').length).toEqual(3) // getElementsByTagName 是不分层级的
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5)
        expect(activeElement).toHaveClass('menu-item is-active')
        expect(disabledElement).toHaveClass('menu-item is-disabled')
    });
    it('click item should change active and run callback', () => {
        const thirdItem = wrapper.getByText('hello')
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('is-active')
        expect(activeElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith('2')

        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('is-active');
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1')

    });
    it('should render vertical mode', () => {
        // 清除在beforeEach中产生的wrapper
        cleanup()
        const wrapper = render(getMenu(testVertical))
        const menuElement = wrapper.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    });
    it('should show dropdown items when hover on  subMenu', async () => {
        // queryByText 与 getByText 的区别主要是 queryByText会返回HTMLElement或者是null
        // toBeVisible() JS DOM新增的方法  可是我们是通过js的display来控制展开的,而测试用例里面没有
        expect(wrapper.queryByText('drop1')).not.toBeVisible()
        const dropdownElement = wrapper.getByText('dropdown')
        fireEvent.mouseEnter(dropdownElement)
        // expect(wrapper.queryByText('drop1')).toBeVisible() // 因为 代码里面 hover会有一个timeout的等待,所以并不能直接显示,导致报错
        // 利用waitFor解决异步问题
        await waitFor(() => {
            expect(wrapper.queryByText('drop1')).toBeVisible()
        })
        fireEvent.click(wrapper.getByText('drop1'))
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
        fireEvent.mouseLeave(dropdownElement)
        await waitFor(() => {
            expect(wrapper.queryByText('drop1')).not.toBeVisible()
        })
    })
})

describe('test Menu and MenuItem component in vertical mode', () => {
    beforeEach(() => {
        wrapper2 = render(getMenu(testVertical))
        wrapper2.container.append(createStyleFile())
    })
    it('should render vertical mode when mode is set to vertical', () => {
        const menuElement = wrapper2.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    })
    it('should show dropdown items when click on subMenu for vertical mode', () => {
        const dropDownItem = wrapper2.queryByText('drop1')
        expect(dropDownItem).not.toBeVisible()
        fireEvent.click(wrapper2.getByText('dropdown'))
        expect(dropDownItem).toBeVisible()
    })
    it('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
        expect(wrapper2.queryByText('opened1')).toBeVisible()
    })
})
