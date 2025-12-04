import { Button, Card, Form, Input, Modal, Select, Space, Table, Tag } from 'antd';
import { useState } from 'react';
import { tenants } from '../../mock/data';

const TenantManagement = () => {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState<typeof tenants[number] | null>(null);

  const columns = [
    { title: '租户名称', dataIndex: 'name' },
    { title: '联系人', dataIndex: 'contact' },
    { title: '创建时间', dataIndex: 'createdAt' },
    {
      title: '状态',
      dataIndex: 'status',
      render: (v: string) => <Tag color={v === 'active' ? 'green' : 'red'}>{v === 'active' ? '启用' : '禁用'}</Tag>
    },
    { title: '资源配额使用', dataIndex: 'quota' },
    {
      title: '操作',
      render: (_, record: (typeof tenants)[number]) => (
        <Space>
          <a>编辑</a>
          <a>{record.status === 'active' ? '禁用' : '启用'}</a>
          <a onClick={() => setDetail(record)}>查看详情</a>
        </Space>
      )
    }
  ];

  return (
    <div>
      <div className="page-title">租户管理</div>
      <Card>
        <Space style={{ marginBottom: 12 }} wrap>
          <Input.Search placeholder="按租户名搜索" style={{ width: 220 }} />
          <Select placeholder="状态筛选" style={{ width: 140 }} options={[{ value: 'active', label: '启用' }, { value: 'disabled', label: '禁用' }]} />
          <Button type="primary">创建租户</Button>
        </Space>
        <Table columns={columns} dataSource={tenants} rowKey="name" pagination={false} />
      </Card>

      <Modal
        open={!!detail}
        title="租户详情"
        footer={null}
        onCancel={() => setDetail(null)}
        width={520}
      >
        {detail && (
          <Form layout="vertical" initialValues={detail}>
            <Form.Item label="租户名称" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="联系人" name="contact">
              <Input />
            </Form.Item>
            <Form.Item label="资源配额" name="quota">
              <Input />
            </Form.Item>
            <Form.Item label="用户数 / 知识库数">
              <Space>
                <Tag color="blue">用户 36</Tag>
                <Tag color="purple">知识库 8</Tag>
              </Space>
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default TenantManagement;
