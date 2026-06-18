import { Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import ProtectedRoute from './ProtectedRoute'
import AuthLayout from '@/layouts/AuthLayout'
import LoginPage from '@/features/auth/pages/LoginPage'
import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import ForbiddenPage from '@/pages/ForbiddenPage'
import NotFoundPage from '@/pages/NotFoundPage'
import ProjectPage from '@/features/project/pages/ProjectPage'
import AuthenticationPage from '@/features/authentication/pages/AuthenticationPage'
import OrganizationPage from '@/features/organization/pages/OrganizationPage'



const AppRouter = () => {
  return (
    <Routes>
      {/* Guest routes: chỉ cho phép khi chưa login */}

      <Route element={<AuthLayout />}>
        <Route path="/" element={<LoginPage />} />
      </Route>

      {/* Protected routes: phải login mới vào được */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/project" element={<ProjectPage />} />
          <Route path="/authentication" element={<AuthenticationPage />} />
          <Route path="/organization" element={<OrganizationPage />} />
          <Route path="/organization/department" element={<OrganizationPage />} />
          <Route path="/organization/user" element={<OrganizationPage />} />
        </Route>
      </Route>

      {/* Fallback routes */}
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/403" element={<ForbiddenPage />} />
    </Routes>
  )
}

export default AppRouter