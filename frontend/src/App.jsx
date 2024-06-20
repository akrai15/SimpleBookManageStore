
import './App.css'
import { useAuthContext } from './context/AuthContext'
import { Routes, Route, Navigate } from 'react-router-dom'
import BookList from './Components/BookList'
import LoginForm from './Components/LoginForm'
import SignUpForm from './Components/SignUpForm'
import AddBook from './Components/AddBook'
import UpdateBook from './Components/UpdateBook'
import { Toaster } from 'react-hot-toast'

function App() {
  const {authUser}=useAuthContext();

  
  return (
    <div className='p-4 h-screen-flex items-center justify-center'>
    <Routes>
      <Route path='/' element={<BookList />} />
      <Route path='/login' element={!authUser?<LoginForm/>: <Navigate to="/"/>} />
      <Route path='/signup' element={!authUser?<SignUpForm/>: <Navigate to="/"/>} />
      <Route path='/addbook' element={authUser?<AddBook/>: <Navigate to="/login"/>} />
      <Route path='/update/:id' element={authUser?<UpdateBook/>: <Navigate to="/login"/>} />
      
     
    </Routes>
    <Toaster/>
    </div>
      
  )
}

export default App
