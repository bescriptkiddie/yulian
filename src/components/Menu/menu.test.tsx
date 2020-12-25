import React from 'react'
import {render, RenderResult, fireEvent, cleanup} from '@testing-library/react'

import Menu, {MenuProps} from './Menu'
import MenuItem from './menuItem'

const testProps: MenuProps = {
    defaultIndex: 0,
    onSelect: jest.fn(),
    className: 'test'
}

const testVertical: MenuProps = {
    defaultIndex: 0,
    mode: 'vertical'
}

const getMenu = (props: MenuProps) => {
    return (
        <Menu {...props} >
            <MenuItem > active </MenuItem>
            <MenuItem disabled> disabled </MenuItem>
            <MenuItem > hello </MenuItem>
            <li></li>
        </Menu>
    )
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement

describe('test Menu and MenuItem', () => {
    // 一个钩子,在每个case之前都会跑
    beforeEach(() => {
        wrapper = render(getMenu(testProps))
        // 因为测试案例要求贴近使用者最真实的使用方法,所以通过渲染元素的内容去取得节点,官方推荐在最外层元素调用testId,然后通过api去获取内容
        menuElement = wrapper.getByTestId('test-menu');
        activeElement = wrapper.getByText('active');
        disabledElement = wrapper.getByText('disabled');
    })
    it('should render default props', () => {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass('yl-menu test')
        expect(menuElement.getElementsByTagName('li').length).toEqual(3)
        expect(activeElement).toHaveClass('menu-item is-active')
        expect(disabledElement).toHaveClass('menu-item is-disabled')
    });
    it('click item should change active and run callback', () => {
        const thirdItem = wrapper.getByText('hello')
        fireEvent.click(thirdItem)
        expect(thirdItem).toHaveClass('is-active')
        expect(activeElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith(2)

        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('is-active');
        expect(testProps.onSelect).not.toHaveBeenCalledWith(1)

    });
    it('should render vertical mode', () => {
        // 清除在beforeEach中产生的wrapper
        cleanup()
        const wrapper = render(getMenu(testVertical))
        const menuElement = wrapper.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    });
})
