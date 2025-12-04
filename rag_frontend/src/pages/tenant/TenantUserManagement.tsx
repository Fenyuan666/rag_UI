import { Button, Card, Form, Input, Modal, Select, Space, Table, Tag } from 'antd';
import { useState } from 'react';
import { tenantUsers } from '../../mock/data';

const TenantUserManagement = () => {
  const [openInvite, setOpenInvite] = useState(false);

  const columns = [
    { title: '姓名', dataIndex: 'name' },
    { title: '账号', dataIndex: 'account' },
    { title: '角色', dataIndex: 'role' },
    {
      title: '状态',
      dataIndex: 'status',
      render: (v: string) => <Tag color={v === 'active' ? 'green' : 'red'}>{v === 'active' ? '启用' : '禁用'}</Tag>
    },
    { title: '创建时间', dataIndex: 'createdAt' },
    { title: '最后登录', dataIndex: 'lastLogin' },
    {
      title: '操作',
      render: () => (
        <Space>
          <a>编辑</a>
          <a>禁用/启用</a>
          <a>删除</a>
          <a>重置密码</a>
        </Space>
      )
    }
  ];

  return (
    <div>
      <div className="page-title">租户用户管理</div>
      <Card>
        <Space style={{ marginBottom: 12 }} wrap>
          <Select placeholder="按角色" style={{ width: 160 }} options={[{ value: 'tenantAdmin', label: '租户管理员' }, { value: 'user', label: '普通用户' }]} />
          <Select placeholder="状态" style={{ width: 140 }} options={[{ value: 'active', label: '启用' }, { value: 'disabled', label: '禁用' }]} />
          <Input.Search placeholder="搜索姓名/账号" style={{ width: 220 }} />
          <Button type="primary" onClick={() => setOpenInvite(true)}>
            邀请用户
          </Button>
        </Space>
        <Table columns={columns} dataSource={tenantUsers} rowKey="account" pagination={false} />
      </Card>

      <Modal
        open={openInvite}
        title="邀请用户"
        onCancel={() => setOpenInvite(false)}
        onOk={() => setOpenInvite(false)}
      >
        <Form layout="vertical">
          <Form.Item label="邮箱 / 手机号" required>
            <Input placeholder="user@example.com" />
          </Form.Item>
          <Form.Item label="分配角色" required>
            <Select options={[{ value: 'tenantAdmin', label: '租户管理员' }, { value: 'maintainer', label: '知识库维护员' }, { value: 'user', label: '普通用户' }]} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TenantUserManagement;
