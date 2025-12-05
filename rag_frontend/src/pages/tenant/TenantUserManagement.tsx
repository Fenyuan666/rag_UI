import { Button, Card, Form, Input, Modal, Select, Space, Table, Tag, Checkbox, message } from 'antd';
import { useState } from 'react';
import { tenantUsers } from '../../mock/data';

const TenantUserManagement = () => {
  const [openInvite, setOpenInvite] = useState(false);
  const [inviteForm] = Form.useForm();
  const [inviting, setInviting] = useState(false);

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

  const randomPassword = () => {
    const chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890!@#$%';
    return Array.from({ length: 12 })
      .map(() => chars[Math.floor(Math.random() * chars.length)])
      .join('');
  };

  const handleInvite = async () => {
    try {
      const values = await inviteForm.validateFields();
      setInviting(true);
      setTimeout(() => {
        setInviting(false);
        setOpenInvite(false);
        message.success(`已邀请 ${values.realName}（Mock）`);
        inviteForm.resetFields();
      }, 800);
    } catch {
      setInviting(false);
    }
  };

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
        onOk={handleInvite}
        confirmLoading={inviting}
        okText={inviting ? '邀请中...' : '确认邀请'}
        width={520}
      >
        <Form layout="vertical" form={inviteForm} initialValues={{ role: 'user', sendNotice: true, password: randomPassword() }}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }, { pattern: /^[a-zA-Z0-9_]{2,20}$/, message: '2-20字符，英文/数字/下划线' }]}
          >
            <Input placeholder="username" />
          </Form.Item>
          <Form.Item
            label="真实姓名"
            name="realName"
            rules={[{ required: true, message: '请输入真实姓名' }, { min: 2, max: 10, message: '2-10字符' }]}
          >
            <Input placeholder="张三" />
          </Form.Item>
          <Form.Item label="角色分配" name="role" rules={[{ required: true }]}>
            <Select
              options={[
                { value: 'tenantAdmin', label: '租户管理员' },
                { value: 'maintainer', label: '知识库维护员' },
                { value: 'user', label: '普通用户' }
              ]}
            />
          </Form.Item>
          <Form.Item
            label="联系电话"
            name="phone"
            rules={[{ required: true, message: '请输入手机号' }, { pattern: /^1\d{10}$/, message: '请输入11位手机号' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="联系邮箱"
            name="email"
            rules={[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '邮箱格式错误' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="初始密码"
            name="password"
            rules={[
              { required: true, message: '请输入初始密码' },
              { pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%]).{8,16}$/, message: '8-16位，含大小写、数字、特殊字符' }
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="sendNotice" valuePropName="checked">
            <Checkbox>发送通知到邮箱/手机</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TenantUserManagement;
