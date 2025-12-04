import { Button, Card, Modal, Space, Table, Tag } from 'antd';
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
      title: '操作',
      render: (_, record: (typeof qaLogs)[number]) => <a onClick={() => setCurrent(record)}>详情</a>
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
          <div>
            <p>用户：{current.user}</p>
            <p>问题：{current.question}</p>
            <p>回答：{current.answer}</p>
            <p>溯源文档：mock-doc-1、mock-doc-2</p>
            <p>用户反馈：满意</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TenantQALog;
