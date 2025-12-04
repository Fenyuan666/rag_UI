import { Button, Card, Form, Input, Modal, Select, Space, Table, Tag } from 'antd';
import { useState } from 'react';
import { knowledgeBases } from '../../mock/data';

const TenantKBManagement = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openPermission, setOpenPermission] = useState(false);

  const columns = [
    { title: '名称', dataIndex: 'name' },
    { title: '文档数', dataIndex: 'docs' },
    { title: '创建时间', dataIndex: 'createdAt' },
    {
      title: '状态',
      dataIndex: 'status',
      render: (v: string) => <Tag color={v === 'active' ? 'green' : 'red'}>{v === 'active' ? '可用' : '停用'}</Tag>
    },
    { title: '可见范围', dataIndex: 'scope' },
    {
      title: '操作',
      render: () => (
        <Space>
          <a>编辑</a>
          <a>导入/导出</a>
          <a onClick={() => setOpenPermission(true)}>权限配置</a>
          <a>删除</a>
        </Space>
      )
    }
  ];

  return (
    <div>
      <div className="page-title">知识库管理</div>
      <Card>
        <Space style={{ marginBottom: 12 }} wrap>
          <Button type="primary" onClick={() => setOpenCreate(true)}>
            创建知识库
          </Button>
          <Select placeholder="可见范围" style={{ width: 180 }} options={[{ value: 'all', label: '全租户' }, { value: 'role', label: '指定角色' }]} />
        </Space>
        <Table columns={columns} dataSource={knowledgeBases} rowKey="name" pagination={false} />
      </Card>

      <Modal
        open={openCreate}
        title="创建知识库"
        onCancel={() => setOpenCreate(false)}
        onOk={() => setOpenCreate(false)}
      >
        <Form layout="vertical">
          <Form.Item label="名称" required>
            <Input />
          </Form.Item>
          <Form.Item label="描述">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={openPermission}
        title="知识库权限配置"
        onCancel={() => setOpenPermission(false)}
        onOk={() => setOpenPermission(false)}
      >
        <Form layout="vertical">
          <Form.Item label="可访问角色">
            <Select
              mode="multiple"
              options={[
                { value: 'tenantAdmin', label: '租户管理员' },
                { value: 'maintainer', label: '维护员' },
                { value: 'user', label: '普通用户' }
              ]}
            />
          </Form.Item>
          <Form.Item label="可访问用户">
            <Select mode="tags" placeholder="输入用户账号" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TenantKBManagement;
