import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import ProtectedRoute from './ProtectedRoute'
import AuthLayout from '@/layouts/AuthLayout'
import LoginPage from '@/features/auth/pages/LoginPage'
import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import ForbiddenPage from '@/pages/ForbiddenPage'
import NotFoundPage from '@/pages/NotFoundPage'
import UserListPage from '@/features/users/pages/UserListPage'



const AppRouter = () => {
  return (
    <Routes>
      {/* Guest routes: chỉ cho phép khi chưa login */}

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>


      {/* Protected routes: phải login mới vào được */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/users/list" element={<UserListPage />} />
        </Route>
      </Route>

      {/* Fallback routes */}
      <Route path="/403" element={<ForbiddenPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRouter