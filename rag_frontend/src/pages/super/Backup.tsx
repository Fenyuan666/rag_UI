import { Button, Card, Modal, Space, Table, Tag } from 'antd';
import { useState } from 'react';
import { backups } from '../../mock/data';

const Backup = () => {
  const [open, setOpen] = useState(false);
  const columns = [
    { title: '备份时间', dataIndex: 'time' },
    { title: '类型', dataIndex: 'type' },
    {
      title: '状态',
      dataIndex: 'status',
      render: (v: string) => <Tag color={v === '完成' ? 'green' : 'blue'}>{v}</Tag>
    },
    { title: '文件大小', dataIndex: 'size' },
    {
      title: '操作',
      render: () => (
        <Space>
          <a>下载</a>
          <a>删除</a>
          <a onClick={() => setOpen(true)}>恢复</a>
        </Space>
      )
    }
  ];

  return (
    <div>
      <div className="page-title">数据备份恢复</div>
      <Card>
        <Space style={{ marginBottom: 12 }}>
          <Button type="primary">创建备份</Button>
        </Space>
        <Table dataSource={backups} columns={columns} rowKey="time" pagination={false} />
      </Card>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => setOpen(false)}
        title="恢复确认"
      >
        确认从所选时间点恢复？恢复前请确保已做最新备份。
      </Modal>
    </div>
  );
};

export default Backup;
