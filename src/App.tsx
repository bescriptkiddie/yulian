import React from 'react';
// import './App.css';
import './styles/index.scss'

import Button, {ButtonType, ButtonSize} from './components/Button/Button'

import Menu from './components/Menu/Menu'
import MenuItem from './components/Menu/menuItem'

function App() {
    return (
        <div className="App">
            <header className="App-header">

                <Menu defaultIndex={0} mode={'vertical'} onSelect={index => {
                    alert(index)
                }}>
                    <MenuItem index={0} > menu 1 </MenuItem>
                    <MenuItem index={1} disabled> menu 2 </MenuItem>
                    <MenuItem index={2}> menu 3 </MenuItem>
                </Menu>

                <Button onClick={(e) => {
                    console.log(e.target)
                }} size={ButtonSize.Small}> Hello </Button>
                <Button disabled> Hello </Button>
                <Button btnType={ButtonType.Primary} size={ButtonSize.Large}> Primary </Button>
                <Button btnType={ButtonType.Link} href="https://github.com" disabled> github </Button>
                <Button btnType={ButtonType.Danger} onClick={(e) => {
                    console.log(e.target)
                }} target="_blank"> github </Button>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
