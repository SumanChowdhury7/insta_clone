import {BrowserRouter, Routes, Route} from 'react-router'
import  Login from './features/auth/pages/Login'
import  Register from './features/auth/pages/Register'
import  Feed from './features/post/pages/Feed'
function AppRoutes(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/Login' element={<Login />}/>
            <Route path='/Register' element={<Register />}/>
            <Route path='/' element={<Feed />} />
        </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;