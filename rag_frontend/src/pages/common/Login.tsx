import { Button, Card, Checkbox, Form, Input, Select, Space, Typography, message } from 'antd';
import { LockOutlined, UserOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
  const [countdown, setCountdown] = useState(0);

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

  const sendCode = () => {
    if (countdown) return;
    message.success('验证码已发送（Mock）');
    setCountdown(60);
  };

  useEffect(() => {
    if (!countdown) return;
    const timer = setInterval(() => setCountdown((c) => (c > 0 ? c - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className="login-page">
      <div className="login-top">
        <Space align="center" size={8}>
          <SafetyCertificateOutlined style={{ fontSize: 20, color: 'var(--brand)' }} />
          <span>工业级 RAG 知识库问答系统</span>
        </Space>
      </div>
      <div className="login-center">
        <Card
          className="login-card"
          title={
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: 20 }}>用户登录</div>
              <Text type="secondary">账号/密码 + 验证码，选择角色后进入对应首页</Text>
            </div>
          }
        >
          <Form layout="vertical" form={form} onFinish={handleFinish} initialValues={{ remember: true, role: 'super' }}>
            <Form.Item
              name="username"
              label="账号 / 手机号 / 邮箱"
              rules={[{ required: true, message: '请输入账号' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="admin / 138****8888 / user@example.com" />
            </Form.Item>
            <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="••••••" />
            </Form.Item>
            <Form.Item name="captcha" label="验证码" rules={[{ required: true, message: '请输入验证码' }]}>
              <Space.Compact style={{ width: '100%' }}>
                <Input placeholder="短信/图片验证码" />
                <Button onClick={sendCode} disabled={!!countdown}>
                  {countdown ? `${countdown}s` : '获取验证码'}
                </Button>
              </Space.Compact>
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
                <Text type="secondary">验证码倒计时 · Mock</Text>
              </Space>
            </Space>
          </Form>
        </Card>
      </div>
      <div className="login-footer">
        <Space size={16}>
          <Text type="secondary">© 2024 rag_frontend</Text>
          <a>隐私政策</a>
        </Space>
      </div>
    </div>
  );
};

export default Login;
