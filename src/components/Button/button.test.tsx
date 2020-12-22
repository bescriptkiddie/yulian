import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import Button, {ButtonType, ButtonSize, ButtonProps} from './Button'

const defaultProps = {
    // 创建了一个被监控的模拟函数
    onClick: jest.fn()
}

const testProps: ButtonProps = {
    btnType: ButtonType.Primary,
    size: ButtonSize.Large,
    className: 'hello'
}

const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn() // 为了验证onClick不被触发
}

describe('test Button component', () => {
    it('default button', () => {
        const wrapper = render(<Button {...defaultProps}>Hello</Button>)
        const element = wrapper.getByText('Hello') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('BUTTON')
        expect(element).toHaveClass('btn btn-default')
        expect(element.disabled).toBeFalsy()
        // 模拟点击按钮
        fireEvent.click(element)
        expect(defaultProps.onClick).toHaveBeenCalled()
    })
    it('base on different props', () => {
        const wrapper = render(<Button {...testProps}>Hello</Button>)
        const element = wrapper.getByText('Hello')
        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('btn-primary btn-lg hello')
    })
    it('link button', () => {
        const wrapper = render(<Button btnType={ButtonType.Link} href="www.google.com">Link</Button>)
        const element = wrapper.getByText('Link')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('A')
        expect(element).toHaveClass('btn btn-link')

    })
    it('disabled button', () => {
        const wrapper = render(<Button {...disabledProps}>disable</Button>)
        const element = wrapper.getByText('disable') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.disabled).toBeTruthy()
        fireEvent.click(element)
        expect(disabledProps.onClick).not.toHaveBeenCalled() // 没有被调用
    })
})
