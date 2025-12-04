import { Button, Card, DatePicker, Select, Space, Table, Tag } from 'antd';
import { auditLogs } from '../../mock/data';

const AuditLog = () => {
  const columns = [
    { title: '操作人', dataIndex: 'actor' },
    { title: '角色', dataIndex: 'role' },
    { title: '租户', dataIndex: 'tenant' },
    { title: '操作内容', dataIndex: 'action' },
    { title: '时间', dataIndex: 'time' },
    { title: 'IP', dataIndex: 'ip' },
    {
      title: '结果',
      dataIndex: 'result',
      render: (v: string) => <Tag color={v === '成功' ? 'green' : 'red'}>{v}</Tag>
    }
  ];

  return (
    <div>
      <div className="page-title">日志审计</div>
      <Card>
        <Space style={{ marginBottom: 12 }} wrap>
          <Select placeholder="角色" style={{ width: 140 }} options={[{ value: 'super', label: '超级管理员' }, { value: 'tenantAdmin', label: '租户管理员' }]} />
          <Select placeholder="租户" style={{ width: 140 }} options={[{ value: 'Acme', label: 'Acme' }]} />
          <Select placeholder="操作类型" style={{ width: 160 }} options={[{ value: 'update', label: '配置变更' }, { value: 'user', label: '用户操作' }]} />
          <DatePicker.RangePicker />
          <Button type="primary">筛选</Button>
          <Button>导出 CSV</Button>
        </Space>
        <Table dataSource={auditLogs} columns={columns} rowKey="id" pagination={{ pageSize: 8 }} />
      </Card>
    </div>
  );
};

export default AuditLog;
