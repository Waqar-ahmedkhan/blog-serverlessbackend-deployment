import { Route, Routes } from 'react-router-dom'
import './App.css'
import Blog from './pages/Blog'
import Blogs from './pages/Blogs'
import Publish from './pages/Publish'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

function App() {
  

  return (
    <>
    <Routes>
      <Route  path='/signup' element={<Signup/>}/>
      <Route  path='*' element={<Signup/>}/>
      <Route  path='/signin' element={<Signin/>}/>
      <Route  path='/blogs' element={<Blogs/>}/>
      <Route  path='/blog/:id' element={<Blog/>}/>
      <Route path='/publish' element={<Publish/>}/>



    </Routes>
    </>
  )
}

export default App
