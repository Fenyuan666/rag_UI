import { useMemo, useState } from 'react';
import {
  Alert,
  Avatar,
  Button,
  Drawer,
  Dropdown,
  Input,
  Layout,
  List,
  Modal,
  Popconfirm,
  Rate,
  Space,
  Tag,
  Typography
} from 'antd';
import {
  AudioOutlined,
  FileOutlined,
  MoreOutlined,
  PictureOutlined,
  PlusOutlined,
  SendOutlined,
  SettingOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { chatHistory } from '../../mock/data';

const { Content } = Layout;
const { Text } = Typography;

interface Message {
  id: number;
  from: 'user' | 'bot';
  content: string;
  sources?: string[];
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: 'bot',
      content: '你好，我是豆包风格的助理，有什么可以帮助你？'
    },
    {
      id: 2,
      from: 'user',
      content: '帮我总结产品手册的亮点'
    },
    {
      id: 3,
      from: 'bot',
      content:
        '产品手册亮点：\n1) 支持多租户隔离\n2) 内置分块优化\n3) 提供备份恢复策略\n\n来源：产品手册V2.pdf',
      sources: ['产品手册V2.pdf']
    }
  ]);
  const [input, setInput] = useState('');
  const [sessions, setSessions] = useState(chatHistory.map((c) => ({ ...c, starred: false, unread: false })));
  const [activeSession, setActiveSession] = useState(chatHistory[0]?.id || 0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackRate, setFeedbackRate] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);

  const send = () => {
    if (!input && !attachments.length) return;
    const nextId = messages[messages.length - 1]?.id + 1 || 1;
    setMessages((prev) => [
      ...prev,
      { id: nextId, from: 'user', content: input || '发送了附件' },
      {
        id: nextId + 1,
        from: 'bot',
        content: '这是基于 Mock 的回答。来源：内部 FAQ',
        sources: ['内部FAQ']
      }
    ]);
    setInput('');
    setAttachments([]);
  };

  const addSession = () => {
    const now = new Date();
    const title = `对话-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const id = Date.now();
    setSessions([{ id, title, updatedAt: '刚刚', starred: false, unread: false }, ...sessions]);
    setActiveSession(id);
  };

  const moreMenu = useMemo(
    () => ({
      items: [
        { key: 'kb', label: '知识库检索' },
        { key: 'voice', label: '语音输入' },
        { key: 'clear', label: '清空输入' },
        { key: 'settings', label: '设置' }
      ],
      onClick: (info: { key: string }) => {
        if (info.key === 'clear') setInput('');
      }
    }),
    []
  );

  const attachmentBar = attachments.length ? (
    <div style={{ padding: '8px 0', display: 'flex', gap: 8, overflowX: 'auto' }}>
      {attachments.map((file) => (
        <Tag key={file} closable onClose={() => setAttachments((prev) => prev.filter((f) => f !== file))}>
          {file}
        </Tag>
      ))}
    </div>
  ) : null;

  return (
    <div className="doubao-bg">
      <div className="doubao-topbar">
        <Space>
          <Button type="text" icon={<MoreOutlined />} onClick={() => setDrawerOpen(true)} />
          <Text strong>RAG 智能问答</Text>
        </Space>
        <Input defaultValue="当前会话名称" style={{ width: 240 }} />
        <Space>
          <Button type="text" icon={<QuestionCircleOutlined />} />
          <Button type="text" icon={<SettingOutlined />} />
          <Avatar style={{ background: '#1677ff' }}>A</Avatar>
        </Space>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <div className="doubao-sider-toggle" onClick={() => setDrawerOpen(true)}>
          会话
        </div>
        <Content className="doubao-chat-area">
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div className={`doubao-bubble ${msg.from === 'user' ? 'user-bubble' : 'system-bubble'}`}>
                {msg.content.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
                {msg.sources && (
                  <div style={{ marginTop: 8, display: 'flex', gap: 8, alignItems: 'center', color: '#666' }}>
                    <Tag color="blue" style={{ background: '#e8f3ff', color: '#1677ff' }}>
                      来源
                    </Tag>
                    {msg.sources.map((s) => (
                      <a key={s} style={{ fontSize: 12, color: '#1677ff' }}>
                        {s}
                      </a>
                    ))}
                  </div>
                )}
                {msg.from === 'bot' && (
                  <div style={{ marginTop: 6, display: 'flex', gap: 10, fontSize: 12, color: '#999' }}>
                    <a onClick={() => { setFeedbackOpen(true); setFeedbackRate(1); }}>有用</a>
                    <a onClick={() => { setFeedbackOpen(true); setFeedbackRate(-1); }}>无用</a>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 6, marginTop: 12, marginLeft: 40 }}>
            <div className="typing-dot" />
            <div className="typing-dot" style={{ animationDelay: '0.1s' }} />
            <div className="typing-dot" style={{ animationDelay: '0.2s' }} />
          </div>
        </Content>
      </div>

      <div className="doubao-input-bar">
        <div className="doubao-input-shell">
          <Space size={8}>
            <Button shape="circle" icon={<FileOutlined />} onClick={() => setAttachments([...attachments, '文档.pdf'])} />
            <Button shape="circle" icon={<PictureOutlined />} onClick={() => setAttachments([...attachments, '图片.png'])} />
            <Dropdown menu={moreMenu} trigger={['click']}>
              <Button shape="circle" icon={<MoreOutlined />} />
            </Dropdown>
          </Space>
          <div style={{ flex: 1 }}>
            {attachmentBar}
            <Input.TextArea
              className="doubao-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="输入问题继续提问，支持上传文档/截图/语音…"
              autoSize={{ minRows: 1, maxRows: 6 }}
              bordered={false}
            />
          </div>
          <Space size={8}>
            {!input && !attachments.length && <Button shape="circle" icon={<AudioOutlined />} />}
            <Button type="primary" shape="round" icon={<SendOutlined />} disabled={!input && !attachments.length} onClick={send}>
              发送
            </Button>
          </Space>
        </div>
      </div>

      <Drawer
        placement="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={300}
        bodyStyle={{ padding: 0 }}
        maskStyle={{ backdropFilter: 'blur(4px)' }}
      >
        <div style={{ padding: 12, borderBottom: '1px solid #f0f0f0' }}>
          <Input.Search placeholder="搜索会话" />
          <Button type="primary" block style={{ marginTop: 8 }} icon={<PlusOutlined />} onClick={addSession}>
            新会话
          </Button>
        </div>
        <List
          dataSource={sessions}
          renderItem={(item) => (
            <List.Item
              style={{
                cursor: 'pointer',
                background: item.id === activeSession ? '#e8f3ff' : '#fff',
                borderLeft: item.id === activeSession ? '3px solid #1677ff' : '3px solid transparent'
              }}
              onClick={() => setActiveSession(item.id)}
              actions={[
                <Popconfirm key="del" title="删除会话？">
                  <a style={{ color: '#ff4d4f' }}>删除</a>
                </Popconfirm>
              ]}
            >
              <List.Item.Meta
                title={
                  <Space>
                    <Text strong>{item.title}</Text>
                    {item.unread && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff4d4f' }} />}
                  </Space>
                }
                description={<Text type="secondary" style={{ fontSize: 12 }}>{item.updatedAt}</Text>}
              />
            </List.Item>
          )}
        />
      </Drawer>

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
          <Rate allowHalf defaultValue={feedbackRate === 1 ? 5 : 1} />
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
