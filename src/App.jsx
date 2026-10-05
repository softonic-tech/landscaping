import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import About from './pages/About'
import Areas from './pages/Areas'
import Contact from './pages/Contact'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Services from './pages/Services'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services/*" element={<Services />} />
          <Route path="projects/*" element={<Projects />} />
          <Route path="areas/*" element={<Areas />} />
          <Route path="about/*" element={<About />} />
          <Route path="contact/*" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
