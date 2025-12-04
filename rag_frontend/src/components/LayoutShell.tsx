import { Layout, Menu, Avatar, Dropdown, Space, Tag, Button, Typography } from 'antd';
import {
  DashboardOutlined,
  HomeOutlined,
  SettingOutlined,
  TeamOutlined,
  DatabaseOutlined,
  FileTextOutlined,
  CloudUploadOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
  BarChartOutlined,
  CommentOutlined,
  CustomerServiceOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import type { Role } from '../types';
import RoleBadge from './RoleBadge';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

interface LayoutShellProps {
  role: Role;
  onRoleChange: (role: Role) => void;
}

type MenuItem = Required<MenuProps>['items'][number];

const buildMenu = (role: Role): MenuItem[] => {
  const base: MenuItem[] = [
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: '个人中心'
    }
  ];

  const superMenus: MenuItem[] = [
    {
      key: 'super',
      label: '超级管理员',
      icon: <SafetyCertificateOutlined />,
      children: [
        { key: '/super/dashboard', icon: <DashboardOutlined />, label: '首页' },
        { key: '/super/tenants', icon: <TeamOutlined />, label: '租户管理' },
        { key: '/super/config', icon: <SettingOutlined />, label: '全局配置' },
        { key: '/super/audit', icon: <FileTextOutlined />, label: '日志审计' },
        { key: '/super/backup', icon: <CloudUploadOutlined />, label: '备份恢复' }
      ]
    }
  ];

  const tenantMenus: MenuItem[] = [
    {
      key: 'tenant',
      label: '租户管理员',
      icon: <HomeOutlined />,
      children: [
        { key: '/tenant/dashboard', icon: <DashboardOutlined />, label: '首页' },
        { key: '/tenant/users', icon: <TeamOutlined />, label: '用户管理' },
        { key: '/tenant/kb', icon: <DatabaseOutlined />, label: '知识库管理' },
        { key: '/tenant/ops', icon: <BarChartOutlined />, label: '运营统计' },
        { key: '/tenant/qa', icon: <CommentOutlined />, label: '问答日志' }
      ]
    }
  ];

  const maintainerMenus: MenuItem[] = [
    {
      key: 'maintainer',
      label: '知识库维护',
      icon: <LockOutlined />,
      children: [
        { key: '/maintainer/content', icon: <DatabaseOutlined />, label: '内容管理' },
        { key: '/maintainer/optimization', icon: <FileTextOutlined />, label: '优化闭环' }
      ]
    }
  ];

  const userMenus: MenuItem[] = [
    {
      key: '/chat',
      icon: <CustomerServiceOutlined />,
      label: '智能问答'
    }
  ];

  const menus: MenuItem[] = [...base];
  if (role === 'super') {
    menus.push(...superMenus, ...tenantMenus, ...maintainerMenus, ...userMenus);
  } else if (role === 'tenantAdmin') {
    menus.push(...tenantMenus, ...maintainerMenus, ...userMenus);
  } else if (role === 'maintainer') {
    menus.push(...maintainerMenus, ...userMenus);
  } else {
    menus.push(...userMenus);
  }
  return menus;
};

const roleOptions: { label: string; value: Role }[] = [
  { label: '超级管理员', value: 'super' },
  { label: '租户管理员', value: 'tenantAdmin' },
  { label: '知识库维护员', value: 'maintainer' },
  { label: '内部用户', value: 'user' }
];

const LayoutShell = ({ role, onRoleChange }: LayoutShellProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const items = buildMenu(role);

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (!String(key).startsWith('/')) return;
    navigate(key);
  };

  const menuSelectedKeys = [location.pathname];

  const dropdownItems = roleOptions.map((item) => ({
    key: item.value,
    label: item.label
  }));

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={236} breakpoint="lg" collapsedWidth={60} style={{ background: '#fff' }}>
        <div style={{ padding: '16px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Avatar shape="square" size={36} style={{ background: '#1677ff' }}>
            R
          </Avatar>
          <div style={{ lineHeight: 1.2, color: '#111827' }}>
            <div style={{ fontWeight: 700 }}>RAG 控制台</div>
            <Text type="secondary" style={{ fontSize: 12 }}>
              rag_frontend
            </Text>
          </div>
        </div>
        <Menu
          mode="inline"
          items={items}
          selectedKeys={menuSelectedKeys}
          onClick={handleMenuClick}
          style={{ borderRight: 0 }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: '#fff',
            padding: '0 20px',
            borderBottom: '1px solid #f0f2f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Space>
            <RoleBadge role={role} />
            <Tag color="geekblue">Mock 数据</Tag>
          </Space>
          <Space size="middle">
            <Dropdown
              menu={{
                items: dropdownItems,
                onClick: (info) => onRoleChange(info.key as Role)
              }}
            >
              <Button type="text" icon={<UserOutlined />}>
                切换角色
              </Button>
            </Dropdown>
            <Avatar size={32} style={{ background: '#fde3cf', color: '#fa541c' }}>
              A
            </Avatar>
          </Space>
        </Header>
        <Content style={{ margin: '16px 18px 24px' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutShell;
