import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoutes from './components/ProtectedRoutes'
import {Provider} from 'react-redux'
import store from './redux/store'
import { Admin } from './pages/Admin/Admin'
import Partner from './pages/Partner/Partner'
import SingleMovie from './components/SingleMovie'
import BookShow from './components/BookShow'
import Forgot from './pages/Forgot'
import Reset from './pages/Reset'
import Profile from './pages/Profile/Profile'
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={
            <ProtectedRoutes>
              <Admin/>
            </ProtectedRoutes>
          }/>
          <Route path="/partner" element={
            <ProtectedRoutes>
              <Partner/>
            </ProtectedRoutes>
          }/>
          <Route path="/movie/:id" element={
            <ProtectedRoutes>
              <SingleMovie/>
            </ProtectedRoutes>
          }/>
          <Route path="/book-show/:id" element={
              <ProtectedRoutes>
                <BookShow/>
              </ProtectedRoutes>
          }/>
        <Route path="/forgot-password" element={
            <Forgot/>
        }/>
        <Route path="/reset-password" element={<Reset/>}/>
        <Route path="/profile" element={
          <ProtectedRoutes>
            <Profile/>
          </ProtectedRoutes>
        }/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
