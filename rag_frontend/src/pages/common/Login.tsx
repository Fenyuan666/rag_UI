import { Button, Card, Checkbox, Form, Input, Select, Space, Typography, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import type { Role } from '../../types';

const { Text } = Typography;

interface LoginProps {
  onLogin: (role: Role) => void;
}

const roleOptions = [
  { label: '超级管理员', value: 'super' },
  { label: '租户管理员', value: 'tenantAdmin' },
  { label: '知识库维护员', value: 'maintainer' },
  { label: '内部用户', value: 'user' }
];

const Login = ({ onLogin }: LoginProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();

  const handleFinish = (values: { username: string; password: string; role: Role }) => {
    message.success(`已模拟登录为 ${roleOptions.find((r) => r.value === values.role)?.label}`);
    onLogin(values.role);
    const redirect = (location.state as { from?: string })?.from;
    const map: Record<Role, string> = {
      super: '/super/dashboard',
      tenantAdmin: '/tenant/dashboard',
      maintainer: '/maintainer/content',
      user: '/chat'
    };
    navigate(redirect || map[values.role], { replace: true });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card
        style={{ width: 360, boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}
        title={
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 700, fontSize: 18 }}>RAG 知识库问答系统</div>
            <Text type="secondary">Mock 登录，任选角色进入</Text>
          </div>
        }
      >
        <Form layout="vertical" form={form} onFinish={handleFinish} initialValues={{ remember: true, role: 'super' }}>
          <Form.Item name="username" label="账号" rules={[{ required: true, message: '请输入账号' }]}>
            <Input prefix={<UserOutlined />} placeholder="admin" />
          </Form.Item>
          <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="••••••" />
          </Form.Item>
          <Form.Item name="role" label="角色">
            <Select options={roleOptions} />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
            <Space style={{ justifyContent: 'space-between', width: '100%' }}>
              <a>忘记密码</a>
              <Text type="secondary">验证码已省略</Text>
            </Space>
          </Space>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
