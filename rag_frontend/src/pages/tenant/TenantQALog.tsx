import { Button, Card, Modal, Space, Table, Tag, Typography } from 'antd';
import { useState } from 'react';
import { qaLogs } from '../../mock/data';

const TenantQALog = () => {
  const [current, setCurrent] = useState<typeof qaLogs[number] | null>(null);

  const columns = [
    { title: '提问用户', dataIndex: 'user' },
    { title: '提问内容', dataIndex: 'question' },
    { title: '回答结果', dataIndex: 'answer' },
    { title: '时间', dataIndex: 'time' },
    {
      title: '是否命中',
      dataIndex: 'hit',
      render: (v: boolean) => <Tag color={v ? 'green' : 'red'}>{v ? '命中' : '未命中'}</Tag>
    },
    {
      title: '用户反馈',
      render: (_: unknown, record: (typeof qaLogs)[number]) => (
        <Tag color={record.id % 2 === 0 ? 'blue' : 'gold'}>{record.id % 2 === 0 ? '满意' : '待反馈'}</Tag>
      )
    },
    {
      title: '操作',
      render: (_: unknown, record: (typeof qaLogs)[number]) => <a onClick={() => setCurrent(record)}>详情</a>
    }
  ];

  return (
    <div>
      <div className="page-title">问答日志</div>
      <Card>
        <Space style={{ marginBottom: 12 }}>
          <Button>筛选</Button>
        </Space>
        <Table columns={columns} dataSource={qaLogs} rowKey="id" pagination={false} />
      </Card>

      <Modal open={!!current} onCancel={() => setCurrent(null)} footer={null} title="回答详情" width={640}>
        {current && (
          <Space direction="vertical" style={{ width: '100%' }}>
            <Typography.Text>用户：{current.user}</Typography.Text>
            <Typography.Text>问题：{current.question}</Typography.Text>
            <Typography.Text>回答：{current.answer}</Typography.Text>
            <Typography.Text>溯源文档：mock-doc-1、mock-doc-2</Typography.Text>
            <Typography.Text>命中状态：{current.hit ? '命中' : '未命中'}</Typography.Text>
            <Typography.Text>用户反馈：{current.id % 2 === 0 ? '有用，已采纳' : '无反馈'}</Typography.Text>
          </Space>
        )}
      </Modal>
    </div>
  );
};

export default TenantQALog;
