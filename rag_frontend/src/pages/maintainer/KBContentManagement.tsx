import { Button, Card, Col, Layout, List, Modal, Row, Space, Tree, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useState } from 'react';
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
                <Upload.Dragger name="files" multiple showUploadList={false} style={{ padding: '4px 12px' }}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">点击或拖拽上传</p>
                </Upload.Dragger>
                <Button type="primary">批量上传</Button>
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
                      <a>删除</a>
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
    </div>
  );
};

export default KBContentManagement;
