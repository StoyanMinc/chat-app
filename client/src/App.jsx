import { Route, Router, Routes } from 'react-router-dom';
import Register from "./components/Register";
import Login from './components/Login';
import ChatPage from './components/ChatPage';

function App() {

    return (
        <div className="app-container">
            <Routes>
                <Route path='/' element={<ChatPage />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </div>
    )
}

export default App
