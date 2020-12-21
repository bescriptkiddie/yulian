import React from 'react';
// import './App.css';
import './styles/index.scss'
import Button, {ButtonType, ButtonSize} from './components/Button/Button'

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Button onClick={(e)=>{
                    console.log(e.target)
                }} size={ButtonSize.Small}> Hello </Button>
                <Button disabled> Hello </Button>
                <Button btnType={ButtonType.Primary} size={ButtonSize.Large}> Primary </Button>
                <Button btnType={ButtonType.Link} href="https://github.com" disabled> github </Button>
                <Button btnType={ButtonType.Danger} onClick={(e)=>{
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
