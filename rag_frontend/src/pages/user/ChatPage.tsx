import { useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  Col,
  Input,
  Layout,
  List,
  Row,
  Space,
  Tag,
  Typography
} from 'antd';
import { AudioOutlined, SendOutlined, SearchOutlined } from '@ant-design/icons';
import { chatHistory, kbSearchResults } from '../../mock/data';

const { Sider, Content } = Layout;
const { Text } = Typography;

interface Message {
  from: 'user' | 'bot';
  content: string;
  sources?: string[];
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { from: 'user', content: '你好，帮我总结产品手册的亮点' },
    { from: 'bot', content: '产品手册亮点：1) 支持多租户隔离 2) 内置分块优化 3) 提供备份恢复策略', sources: ['产品手册V2.pdf'] }
  ]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input) return;
    setMessages((prev) => [...prev, { from: 'user', content: input }, { from: 'bot', content: '这是基于 Mock 的回答，包含溯源文档链接。', sources: ['FAQ'] }]);
    setInput('');
  };

  return (
    <div>
      <div className="page-title">智能问答</div>
      <Layout style={{ background: 'transparent' }}>
        <Sider width={240} style={{ background: '#fff', borderRadius: 8 }}>
          <Card title="会话列表" bordered={false} bodyStyle={{ padding: 0 }}>
            <List
              dataSource={chatHistory}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta title={item.title} description={item.updatedAt} />
                </List.Item>
              )}
            />
          </Card>
        </Sider>
        <Content style={{ margin: '0 12px' }}>
          <Card
            title="对话"
            bodyStyle={{ maxHeight: 520, overflow: 'auto', background: '#f9fafb' }}
            extra={<Button icon={<AudioOutlined />}>语音输入</Button>}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              {messages.map((msg, idx) => (
                <Row key={idx} justify={msg.from === 'user' ? 'end' : 'start'}>
                  <Space
                    style={{
                      maxWidth: '78%',
                      background: msg.from === 'user' ? '#1677ff' : '#fff',
                      color: msg.from === 'user' ? '#fff' : '#111',
                      padding: '10px 12px',
                      borderRadius: 12,
                      border: msg.from === 'bot' ? '1px solid #f0f0f0' : 'none'
                    }}
                  >
                    {msg.from === 'bot' && <Avatar size={28}>AI</Avatar>}
                    <span>{msg.content}</span>
                    {msg.sources && (
                      <Space>
                        {msg.sources.map((s) => (
                          <Tag key={s} color="blue">
                            {s}
                          </Tag>
                        ))}
                      </Space>
                    )}
                  </Space>
                </Row>
              ))}
            </Space>
          </Card>
          <Space style={{ width: '100%', marginTop: 8 }}>
            <Input.TextArea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入你的问题..."
              autoSize={{ minRows: 2, maxRows: 4 }}
            />
            <Button type="primary" icon={<SendOutlined />} onClick={send}>
              发送
            </Button>
          </Space>
        </Content>
        <Sider width={280} style={{ background: '#fff', borderRadius: 8 }}>
          <Card title="知识库检索" bordered={false}>
            <Input prefix={<SearchOutlined />} placeholder="关键词搜索" style={{ marginBottom: 8 }} />
            <List
              dataSource={kbSearchResults}
              renderItem={(item) => (
                <List.Item actions={[<a key="preview">预览</a>, <a key="download">下载</a>]}>
                  <List.Item.Meta title={item.name} description={`${item.kb} · ${item.preview}`} />
                </List.Item>
              )}
            />
          </Card>
        </Sider>
      </Layout>
    </div>
  );
};

export default ChatPage;
