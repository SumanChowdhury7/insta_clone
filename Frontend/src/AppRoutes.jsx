import {BrowserRouter, Routes, Route} from 'react-router'
import  Login from './features/auth/pages/Login'
import  Register from './features/auth/pages/Register'
import  Feed from './features/post/pages/Feed'
import CreatePost from './features/post/pages/CreatePost'
import Profile from './features/auth/pages/Profile'
import Nav from './features/shared/components/Nav'
function AppRoutes(){
    return(
        <BrowserRouter>
        <Nav />
        <Routes>
            <Route path='/' element={<Login />}/>
            <Route path='/Register' element={<Register />}/>
            <Route path='/feed' element={<Feed />} />
            <Route path='/create-post' element={<CreatePost />} />
            <Route path='/profile' element={<Profile />} />
        </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;