import { Button, Card, Checkbox, Form, Input, Modal, Radio, Select, Space, Table, Tag, Transfer } from 'antd';
import { useMemo, useState } from 'react';
import { knowledgeBases, tenantUsers } from '../../mock/data';

const TenantKBManagement = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openPermission, setOpenPermission] = useState(false);
  const [scope, setScope] = useState<'all' | 'role' | 'user'>('all');
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [permissionForm] = Form.useForm();

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

  const userData = useMemo(
    () =>
      tenantUsers.map((u) => ({
        key: u.account,
        title: `${u.name}（${u.account}）`,
        description: u.role
      })),
    []
  );

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
        width={720}
      >
        <Form layout="vertical" form={permissionForm} initialValues={{ upload: ['maintainer'], chunk: ['maintainer'] }}>
          <Form.Item label="可见范围">
            <Radio.Group value={scope} onChange={(e) => setScope(e.target.value)}>
              <Space direction="vertical">
                <Radio value="all">全部租户用户可见</Radio>
                <Radio value="role">
                  指定角色可见{' '}
                  {scope === 'role' && (
                    <Select
                      mode="multiple"
                      placeholder="选择角色"
                      style={{ minWidth: 260 }}
                      options={[
                        { value: 'maintainer', label: '知识库维护员' },
                        { value: 'user', label: '普通用户' }
                      ]}
                    />
                  )}
                </Radio>
                <Radio value="user">
                  指定用户可见
                  {scope === 'user' && (
                    <Transfer
                      dataSource={userData}
                      targetKeys={targetKeys}
                      onChange={(keys) => setTargetKeys(keys as string[])}
                      showSearch
                      listStyle={{ width: 260, height: 200 }}
                      titles={['租户用户', '已授权']}
                    />
                  )}
                </Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="操作权限配置" name="upload">
            <Checkbox.Group>
              <Space direction="vertical">
                <Checkbox value="allUpload">允许上传文档（全部授权用户）</Checkbox>
                <Checkbox value="maintainer">允许上传文档（仅维护员）</Checkbox>
              </Space>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item label="编辑分块权限" name="chunk">
            <Checkbox.Group>
              <Space direction="vertical">
                <Checkbox value="allEdit">允许编辑分块（全部授权用户）</Checkbox>
                <Checkbox value="maintainerEdit">允许编辑分块（仅维护员）</Checkbox>
              </Space>
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TenantKBManagement;
