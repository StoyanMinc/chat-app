import { Route, Router, Routes } from 'react-router-dom';
import Register from "./components/Register";
import Login from './components/Login';
import ChatWindow from './components/ChatWindow';

function App() {

    return (
        <div className="app-container">
            <Routes>
                <Route path='/' element={<ChatWindow />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </div>
    )
}

export default App
