import { useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  Input,
  Layout,
  List,
  Row,
  Space,
  Tag,
  Typography,
  Popconfirm,
  Rate,
  Modal
} from 'antd';
import { AudioOutlined, SendOutlined, SearchOutlined, StarOutlined, StarFilled, PlusOutlined } from '@ant-design/icons';
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
  const [sessions, setSessions] = useState(chatHistory.map((c) => ({ ...c, starred: false })));
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackTarget, setFeedbackTarget] = useState<Message | null>(null);
  const [feedbackRate, setFeedbackRate] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');

  const send = () => {
    if (!input) return;
    setMessages((prev) => [...prev, { from: 'user', content: input }, { from: 'bot', content: '这是基于 Mock 的回答，包含溯源文档链接。', sources: ['FAQ'] }]);
    setInput('');
  };

  const addSession = () => {
    const title = `未命名会话-${Date.now()}`;
    setSessions([{ id: Date.now(), title, updatedAt: '刚刚', starred: false }, ...sessions]);
  };

  const toggleStar = (id: number) => {
    setSessions((prev) =>
      prev
        .map((s) => (s.id === id ? { ...s, starred: !s.starred } : s))
        .sort((a, b) => Number(b.starred) - Number(a.starred))
    );
  };

  return (
    <div>
      <div className="page-title">智能问答</div>
      <Layout style={{ background: 'transparent' }}>
        <Sider width={240} style={{ background: '#fff', borderRadius: 8 }}>
          <Card
            title={
              <Space>
                我的会话
                <Button type="primary" icon={<PlusOutlined />} size="small" onClick={addSession}>
                  新建
                </Button>
              </Space>
            }
            bordered={false}
            bodyStyle={{ padding: 0 }}
            extra={<Input.Search placeholder="搜索会话" size="small" />}
          >
            <List
              dataSource={sessions}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    item.starred ? (
                      <StarFilled key="star" style={{ color: '#faad14' }} onClick={() => toggleStar(item.id)} />
                    ) : (
                      <StarOutlined key="star" onClick={() => toggleStar(item.id)} />
                    ),
                    <Popconfirm key="del" title="确认删除此会话？">
                      <a style={{ color: '#ff4d4f' }}>删除</a>
                    </Popconfirm>
                  ]}
                >
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
                        <Button size="small" type="link" onClick={() => {}}>
                          预览文档
                        </Button>
                      </Space>
                    )}
                  </Space>
                  {msg.from === 'bot' && (
                    <Space size={4} style={{ marginTop: 4 }}>
                      <Rate count={1} value={feedbackRate > 0 ? 1 : 0} onChange={() => { setFeedbackTarget(msg); setFeedbackOpen(true); setFeedbackRate(1); }} />
                      <Rate
                        count={1}
                        value={feedbackRate === -1 ? 1 : 0}
                        character="👎"
                        onChange={() => {
                          setFeedbackTarget(msg);
                          setFeedbackOpen(true);
                          setFeedbackRate(-1);
                        }}
                      />
                      <Button size="small" type="link" onClick={() => setFeedbackOpen(true)}>
                        反馈
                      </Button>
                    </Space>
                  )}
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

      <Modal
        open={feedbackOpen}
        onCancel={() => setFeedbackOpen(false)}
        onOk={() => {
          setFeedbackOpen(false);
          setFeedbackText('');
        }}
        title="回答反馈"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>评分：{feedbackRate === 1 ? '有用' : feedbackRate === -1 ? '无用' : '未选择'}</div>
          <Input.TextArea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="可选，填写原因"
            rows={3}
          />
        </Space>
      </Modal>
    </div>
  );
};

export default ChatPage;
