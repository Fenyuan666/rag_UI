import { Button, Card, Form, Input, InputNumber, Modal, Radio, Select, Space, Table, Tag, Progress, Tabs, Typography, message } from 'antd';
import { useMemo, useState } from 'react';
import { tenants as originTenants } from '../../mock/data';

const TenantManagement = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const [detail, setDetail] = useState<(typeof originTenants)[number] | null>(null);
  const [form] = Form.useForm();
  const [createLoading, setCreateLoading] = useState(false);

  const [tenantList, setTenantList] = useState(originTenants);

  const columns = [
    { title: '租户名称', dataIndex: 'name' },
    { title: '租户简称', dataIndex: 'shortName' },
    { title: '联系人', dataIndex: 'contact' },
    { title: '创建时间', dataIndex: 'createdAt' },
    {
      title: '状态',
      dataIndex: 'status',
      render: (v: string) => <Tag color={v === 'active' ? 'green' : 'red'}>{v === 'active' ? '启用' : '禁用'}</Tag>
    },
    {
      title: '资源配额使用',
      render: (record: (typeof tenantList)[number]) => (
        <Space direction="vertical" size={2}>
          <div>
            存储
            <Progress
              percent={Math.round((record.storageUsed / record.storageTotal) * 100)}
              size="small"
              status={
                record.storageUsed / record.storageTotal > 0.9
                  ? 'exception'
                  : record.storageUsed / record.storageTotal > 0.8
                  ? 'active'
                  : 'normal'
              }
            />
          </div>
          <div>
            API 调用
            <Progress
              percent={Math.round((record.apiUsed / record.apiTotal) * 100)}
              size="small"
              status={
                record.apiUsed / record.apiTotal > 0.9
                  ? 'exception'
                  : record.apiUsed / record.apiTotal > 0.8
                  ? 'active'
                  : 'normal'
              }
            />
          </div>
        </Space>
      )
    },
    {
      title: '操作',
      render: (_: unknown, record: (typeof tenantList)[number]) => (
        <Space>
          <a>编辑</a>
          <a>{record.status === 'active' ? '禁用' : '启用'}</a>
          <a onClick={() => setDetail(record)}>详情</a>
          <a style={{ color: '#ff4d4f' }}>删除</a>
        </Space>
      )
    }
  ];

  const createTenant = async () => {
    try {
      const values = await form.validateFields();
      setCreateLoading(true);
      setTimeout(() => {
        const newTenant = {
          id: `tnt-${Date.now()}`,
          name: values.name,
          shortName: values.shortName || values.name.slice(0, 6),
          contact: values.contactEmail,
          createdAt: new Date().toISOString().slice(0, 10),
          status: values.status,
          quota: `${values.storage}G / ${values.storage}G`,
          storageUsed: 0,
          storageTotal: values.storage,
          apiUsed: 0,
          apiTotal: values.apiQuota
        };
        setTenantList([newTenant, ...tenantList]);
        setCreateLoading(false);
        setCreateOpen(false);
        form.resetFields();
        message.success('租户创建成功（Mock）');
      }, 800);
    } catch (e) {
      setCreateLoading(false);
    }
  };

  const detailTabs = useMemo(() => {
    if (!detail) return [];
    return [
      {
        key: 'base',
        label: '基础信息',
        children: (
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <Typography.Text type="secondary">租户ID：{detail.id}</Typography.Text>
            <Typography.Title level={5} style={{ margin: 0 }}>
              {detail.name}（{detail.shortName}）
            </Typography.Title>
            <div>联系人：{detail.contact}</div>
            <div>
              资源配额：
              <Progress
                percent={Math.round((detail.storageUsed / detail.storageTotal) * 100)}
                status={
                  detail.storageUsed / detail.storageTotal > 0.9
                    ? 'exception'
                    : detail.storageUsed / detail.storageTotal > 0.8
                    ? 'active'
                    : 'normal'
                }
                format={() => `${detail.storageUsed}GB / ${detail.storageTotal}GB`}
              />
              <Progress
                percent={Math.round((detail.apiUsed / detail.apiTotal) * 100)}
                status={
                  detail.apiUsed / detail.apiTotal > 0.9
                    ? 'exception'
                    : detail.apiUsed / detail.apiTotal > 0.8
                    ? 'active'
                    : 'normal'
                }
                format={() => `${detail.apiUsed} / ${detail.apiTotal}`}
              />
            </div>
            <div>
              状态：
              <Tag color={detail.status === 'active' ? 'green' : 'red'}>
                {detail.status === 'active' ? '启用' : '禁用'}
              </Tag>
            </div>
            <Typography.Text type="secondary">
              创建时间：{detail.createdAt} · 创建人：系统
            </Typography.Text>
          </Space>
        )
      },
      {
        key: 'overview',
        label: '租户数据概览',
        children: (
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <Space size="large">
              <Card>
                <Typography.Text type="secondary">租户用户数</Typography.Text>
                <Typography.Title level={4} style={{ margin: 0 }}>
                  42 / 活跃 35
                </Typography.Title>
              </Card>
              <Card>
                <Typography.Text type="secondary">知识库数量</Typography.Text>
                <Typography.Title level={4} style={{ margin: 0 }}>
                  8 / 启用 7
                </Typography.Title>
              </Card>
            </Space>
            <Card title="近7天问答量（示意）">
              <Progress percent={76} strokeColor="#1677ff" />
            </Card>
          </Space>
        )
      }
    ];
  }, [detail]);

  return (
    <div>
      <div className="page-title">租户管理</div>
      <Card>
        <Space style={{ marginBottom: 12 }} wrap>
          <Input.Search placeholder="按租户名搜索" style={{ width: 220 }} />
          <Select placeholder="状态筛选" style={{ width: 140 }} options={[{ value: 'active', label: '启用' }, { value: 'disabled', label: '禁用' }]} />
          <Button type="primary" onClick={() => setCreateOpen(true)}>
            创建租户
          </Button>
        </Space>
        <Table columns={columns} dataSource={tenantList} rowKey="id" pagination={{ pageSize: 10 }} />
      </Card>

      <Modal
        open={createOpen}
        title="创建新租户"
        onCancel={() => setCreateOpen(false)}
        onOk={createTenant}
        confirmLoading={createLoading}
        okText={createLoading ? '创建中...' : '确认创建'}
        width={640}
      >
        <Form layout="vertical" form={form}>
          <Space align="start" size={16} style={{ width: '100%' }} wrap>
            <Form.Item
              label="租户名称"
              name="name"
              rules={[{ required: true, message: '请输入租户名称' }, { pattern: /^[\u4e00-\u9fa5\w]{2,30}$/, message: '2-30字符，仅中文/英文/数字/下划线' }]}
              style={{ flex: 1, minWidth: 280 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="租户简称"
              name="shortName"
              rules={[{ max: 10, message: '不超过10字符' }]}
              style={{ flex: 1, minWidth: 220 }}
            >
              <Input />
            </Form.Item>
          </Space>
          <Space align="start" size={16} style={{ width: '100%' }} wrap>
            <Form.Item
              label="联系人"
              name="contactName"
              rules={[{ required: true, message: '请输入联系人' }, { min: 2, max: 20, message: '2-20字符' }]}
              style={{ flex: 1, minWidth: 220 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="联系电话"
              name="contactPhone"
              rules={[{ required: true, message: '请输入手机号' }, { pattern: /^1\d{10}$/, message: '请输入11位手机号' }]}
              style={{ flex: 1, minWidth: 220 }}
            >
              <Input />
            </Form.Item>
          </Space>
          <Form.Item
            label="联系邮箱"
            name="contactEmail"
            rules={[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '邮箱格式错误' }]}
          >
            <Input />
          </Form.Item>
          <Space align="start" size={16} style={{ width: '100%' }} wrap>
            <Form.Item
              label="资源配额-存储容量(GB)"
              name="storage"
              rules={[{ required: true, message: '请输入存储容量' }]}
              initialValue={10}
              style={{ flex: 1, minWidth: 200 }}
            >
              <InputNumber min={1} max={1000} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item
              label="日 API 调用次数"
              name="apiQuota"
              rules={[{ required: true, message: '请输入日调用次数' }]}
              initialValue={1000}
              style={{ flex: 1, minWidth: 200 }}
            >
              <InputNumber min={100} max={100000} style={{ width: '100%' }} />
            </Form.Item>
          </Space>
          <Form.Item label="租户状态" name="status" initialValue="active" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value="active">启用</Radio>
              <Radio value="disabled">禁用</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="备注" name="remark" rules={[{ max: 200, message: '最多200字符' }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={!!detail}
        title={detail ? `租户详情 - ${detail.name}` : '租户详情'}
        footer={
          <Space>
            <Button type="primary">编辑配额</Button>
            <Button onClick={() => setDetail(null)}>关闭</Button>
          </Space>
        }
        onCancel={() => setDetail(null)}
        width={820}
        bodyStyle={{ maxHeight: 520, overflow: 'auto' }}
      >
        {detail && <Tabs items={detailTabs} defaultActiveKey="base" />}
      </Modal>
    </div>
  );
};

export default TenantManagement;
