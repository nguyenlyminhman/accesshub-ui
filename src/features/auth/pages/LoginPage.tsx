import { Form, Input, Button, Card, Typography, message, notification } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { authService } from '../services/auth.service'
import { useAuthStore } from '@/stores/auth.store'
import { useMenuStore } from '@/stores/menu.store'
import type { LoginPayload } from '../types/auth.type'

const { Title } = Typography

const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const setAuth = useAuthStore((s) => s.setAuth)
  const setMenus = useMenuStore((s) => s.setMenus)

  // Sau login, redirect về trang user định vào (nếu có)
  const from = (location.state as { from?: Location })?.from?.pathname ?? '/dashboard'

  const handleSubmit = async (values: LoginPayload) => {
    values.projectCode = 'ACH';

    try {
      const { data } = await authService.login(values)
      const { accessToken, menuList, userInfo } = data;
      setAuth(accessToken, userInfo)
      setMenus(menuList)
      navigate(from, { replace: true })
    } catch (error: any) {
      notification.error({ description: error.message });
    }
  }

  return (
    <Card style={{ width: 400, boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: 32 }}>
        Đăng nhập
      </Title>

      <Form layout="vertical" onFinish={handleSubmit} autoComplete="off">
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Vui lòng nhập username' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" size="large" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            size="large"
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="primary" htmlType="submit" size="large" block>
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default LoginPage