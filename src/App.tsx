import React, {useState} from 'react';
import './styles/index.scss'
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import Icon from './components/Icon/icon'
// import './App.css';
import Button from './components/Button/button'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import SubMenu from './components/Menu/subMenu'
import Transition from './components/Transition/transition'

library.add(fas)
const App: React.FC = () => {
    const [show, setShow] = useState(false)
    return (
        <div className="App">
            <header className="App-header">
                <Icon icon='arrow-down' theme='danger' size='10x'/>
                <Menu defaultIndex="0"
                      defaultOpenSubMenu={['2']}
                      onSelect={(index) => {
                          alert(index)
                      }}
                >
                    <MenuItem> menu 1 </MenuItem>
                    <MenuItem disabled> menu 2 </MenuItem>
                    <SubMenu title="dropdown">
                        <MenuItem> menu dropdown </MenuItem>
                        <MenuItem> menu dropdown </MenuItem>
                        <MenuItem> menu dropdown </MenuItem>
                    </SubMenu>
                    <MenuItem> menu 3 </MenuItem>
                </Menu>
                <Button size="lg" onClick={() => {
                    setShow(!show)
                }}> Toggle </Button>
                <Transition
                    in={show}
                    timeout={300}
                    animation='zoom-in-left'
                >

                    <div>
                        <h1>hello world!</h1>
                        <h1>hello world!</h1>
                        <h1>hello world!</h1>
                        <h1>hello world!</h1>
                    </div>
                </Transition>
                <Transition
                    in={show}
                    timeout={300}
                    animation='zoom-in-top'
                    wrapper
                >
                    <Button size='lg' btnType='primary' >这是个按钮</Button>
                </Transition>
                {/*Button 测试代码块*/}
                {/*<Button onClick={(e) => {*/}
                {/*    console.log(e.target)*/}
                {/*}} size={ButtonSize.Small}> Hello </Button>*/}
                {/*<Button disabled> Hello </Button>*/}
                {/*<Button btnType={ButtonType.Primary} size={ButtonSize.Large}> Primary </Button>*/}
                {/*<Button btnType={ButtonType.Link} href="https://github.com" disabled> github </Button>*/}
                {/*<Button btnType={ButtonType.Danger} onClick={(e) => {*/}
                {/*    console.log(e.target)*/}
                {/*}} target="_blank"> github </Button>*/}
                {/*<a*/}
                {/*    className="App-link"*/}
                {/*    href="https://reactjs.org"*/}
                {/*    target="_blank"*/}
                {/*    rel="noopener noreferrer"*/}
                {/*>*/}
                {/*    Learn React*/}
                {/*</a>*/}
            </header>
        </div>
    );
}

export default App;
