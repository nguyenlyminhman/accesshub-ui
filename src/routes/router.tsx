import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import LoginLayout from '../layouts/LoginLayout'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import UserList from '../pages/UserList'
import UserCreate from '../pages/UserCreate'



const AppRouter = () => {
  return (
    <Routes>
      {/* Guest routes: chỉ cho phép khi chưa login */}

      <Route element={<LoginLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>


      {/* Protected routes: phải login mới vào được */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          {/* User Management — check quyền theo path */}
          <Route path="/users/list" element={<UserList />} />
          <Route path="/users/create" element={<UserCreate />} />

        </Route>
      </Route>

      {/* Fallback routes */}
      <Route path="/403" element={<ForbiddenPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRouter