import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Register from "./components/Register";
import Login from './components/Login';
import ChatPage from './components/ChatPage';
import UserProvider from './context/UserContext';
import AuthGuard from './components/AuthGuard';

function App() {

    return (
        <UserProvider>
            <div className="app-container">
                <Toaster position="top-center" />
                <Routes>
                    <Route element={<AuthGuard />}>
                        <Route path='/' element={<ChatPage />} />
                    </Route>
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </div>

        </UserProvider>
    )
}

export default App
