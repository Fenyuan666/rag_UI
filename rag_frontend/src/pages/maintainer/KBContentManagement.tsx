import { Button, Card, Col, Drawer, Form, Input, InputNumber, Layout, List, Modal, Row, Space, Tabs, Tree, Upload, Checkbox, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useMemo, useState } from 'react';
import { documents, knowledgeBases } from '../../mock/data';

const { Sider, Content } = Layout;

const treeData = knowledgeBases.map((kb) => ({
  title: kb.name,
  key: kb.name,
  children: [{ title: '全部文档', key: `${kb.name}-all` }]
}));

const KBContentManagement = () => {
  const [openDoc, setOpenDoc] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<(typeof documents)[number] | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [chunkDrawer, setChunkDrawer] = useState(false);
  const [selectedChunks, setSelectedChunks] = useState<string[]>([]);
  const [editChunk, setEditChunk] = useState<{ id: string; content: string; weight: number } | null>(null);
  const [mergeOpen, setMergeOpen] = useState(false);

  const chunkList = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, idx) => ({
        id: `chunk-${idx + 1}`,
        content: `分块内容片段 ${idx + 1}：这是示意文本，用于展示分块内容...`,
        weight: 0.8 - idx * 0.05
      })),
    []
  );

  return (
    <div>
      <div className="page-title">知识库内容管理</div>
      <Layout style={{ background: 'transparent' }}>
        <Sider width={240} style={{ background: '#fff', borderRadius: 8 }}>
          <div style={{ padding: 12 }}>
            <Tree treeData={treeData} defaultExpandAll />
          </div>
        </Sider>
        <Content style={{ marginLeft: 12 }}>
          <Card
            title="文档列表"
            extra={
              <Space>
                <Button type="primary" onClick={() => setUploadOpen(true)}>
                  上传文档
                </Button>
              </Space>
            }
          >
            <Row gutter={12}>
              {documents.map((doc) => (
                <Col span={12} key={doc.name}>
                  <Card
                    hoverable
                    onClick={() => {
                      setSelectedDoc(doc);
                      setOpenDoc(true);
                    }}
                  >
                    <div style={{ fontWeight: 600 }}>{doc.name}</div>
                    <div style={{ color: '#8c8c8c' }}>
                      {doc.type} · {doc.size} · 上传于 {doc.uploadedAt}
                    </div>
                    <Space style={{ marginTop: 8 }}>
                      <a>预览</a>
                      <a>下载</a>
                      <a onClick={() => setChunkDrawer(true)}>编辑分块</a>
                      <a style={{ color: '#ff4d4f' }}>删除</a>
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Content>
      </Layout>

      <Modal open={openDoc} onCancel={() => setOpenDoc(false)} footer={null} title="文档详情" width={720}>
        {selectedDoc && (
          <div>
            <p>文档：{selectedDoc.name}</p>
            <p>分块列表：示意 chunk-1、chunk-2 ...</p>
            <Button type="primary" style={{ marginRight: 8 }}>
              编辑分块
            </Button>
            <Button>合并/拆分</Button>
          </div>
        )}
      </Modal>

      <Modal
        open={uploadOpen}
        onCancel={() => setUploadOpen(false)}
        title="上传文档"
        width={640}
        footer={null}
      >
        <Tabs
          defaultActiveKey="single"
          items={[
            {
              key: 'single',
              label: '单文件上传',
              children: (
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Upload.Dragger multiple={false} showUploadList style={{ padding: 20 }}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">点击或拖拽上传，支持 pdf/word/txt/md，单文件最大50MB</p>
                  </Upload.Dragger>
                  <Form layout="vertical">
                    <Form.Item label="分块大小" initialValue={800}>
                      <InputNumber min={200} max={2000} />
                    </Form.Item>
                    <Form.Item label="分块重叠数" initialValue={100}>
                      <InputNumber min={0} max={500} />
                    </Form.Item>
                    <Form.Item name="overwrite" valuePropName="checked">
                      <Checkbox>覆盖同名文档</Checkbox>
                    </Form.Item>
                    <Button type="primary" onClick={() => { message.success('上传完成（Mock）'); setUploadOpen(false); }}>
                      开始上传
                    </Button>
                  </Form>
                </Space>
              )
            },
            {
              key: 'batch',
              label: '批量/压缩包上传',
              children: (
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Upload.Dragger accept=".zip,.rar" showUploadList style={{ padding: 20 }}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">上传压缩包（zip/rar），最大200MB，自动解压批量导入</p>
                  </Upload.Dragger>
                  <Form layout="vertical">
                    <Form.Item label="过滤规则（可选）">
                      <Input placeholder="示例：*.pdf" />
                    </Form.Item>
                  </Form>
                  <Button type="primary" onClick={() => { message.success('批量上传完成（Mock）'); setUploadOpen(false); }}>
                    开始上传
                  </Button>
                </Space>
              )
            }
          ]}
        />
      </Modal>

      <Drawer
        title="分块管理 - 示例文档"
        placement="right"
        width={820}
        open={chunkDrawer}
        onClose={() => setChunkDrawer(false)}
        extra={
          <Space>
            <Button>批量合并</Button>
            <Button danger>批量删除</Button>
          </Space>
        }
      >
        <List
          dataSource={chunkList}
          renderItem={(item) => (
            <List.Item
              actions={[
                <a
                  key="edit"
                  onClick={() =>
                    setEditChunk({
                      id: item.id,
                      content: item.content,
                      weight: item.weight
                    })
                  }
                >
                  编辑
                </a>,
                <a key="merge" onClick={() => setMergeOpen(true)}>
                  合并
                </a>,
                <a key="split">拆分</a>,
                <a key="delete" style={{ color: '#ff4d4f' }}>
                  删除
                </a>
              ]}
            >
              <List.Item.Meta
                title={
                  <Space>
                    <Checkbox
                      checked={selectedChunks.includes(item.id)}
                      onChange={(e) => {
                        setSelectedChunks((prev) =>
                          e.target.checked ? [...prev, item.id] : prev.filter((id) => id !== item.id)
                        );
                      }}
                    />
                    <span>{item.id}</span>
                  </Space>
                }
                description={
                  <div>
                    <div style={{ color: '#4b5563' }}>{item.content}</div>
                    <div style={{ color: '#888' }}>相似度权重：{item.weight}</div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Drawer>

      <Modal
        open={!!editChunk}
        title={editChunk ? `编辑分块 - ${editChunk.id}` : '编辑分块'}
        onCancel={() => setEditChunk(null)}
        onOk={() => {
          message.success('分块已更新（Mock）');
          setEditChunk(null);
        }}
        okText="保存"
      >
        {editChunk && (
          <Form layout="vertical" initialValues={editChunk}>
            <Form.Item label="分块内容" name="content">
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item label="相似度权重" name="weight">
              <InputNumber min={0} max={1} step={0.01} />
            </Form.Item>
          </Form>
        )}
      </Modal>

      <Modal
        open={mergeOpen}
        title="合并分块"
        onCancel={() => setMergeOpen(false)}
        onOk={() => {
          if (selectedChunks.length < 2) {
            message.warning('请至少选择2个分块');
            return;
          }
          message.success('已合并分块（Mock）');
          setMergeOpen(false);
        }}
        okText="确认合并"
      >
        <p>已选分块：{selectedChunks.length ? selectedChunks.join('、') : '未选择'}</p>
        <Input placeholder="请输入新分块名称" />
      </Modal>
    </div>
  );
};

export default KBContentManagement;
