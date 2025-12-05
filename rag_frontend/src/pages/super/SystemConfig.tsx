import { Button, Card, Form, Input, InputNumber, Modal, Select, Space, Tabs, message } from 'antd';
import { useState } from 'react';
import MockChart from '../../components/MockChart';

const defaultVector = {
  type: 'chroma',
  host: 'http://chroma:8000',
  username: '',
  password: ''
};
const defaultModel = {
  provider: 'openai',
  apiKey: '',
  timeout: 30
};
const defaultRag = { topk: 3, threshold: 0.7, rerank: 'on' };
const defaultCache = { redis: 'redis://localhost:6379', expire: 600 };

const SystemConfig = () => {
  const [vectorForm] = Form.useForm();
  const [modelForm] = Form.useForm();
  const [ragForm] = Form.useForm();
  const [cacheForm] = Form.useForm();
  const [testing, setTesting] = useState(false);
  const [saving, setSaving] = useState(false);

  const resetConfirm = (cb: () => void) => {
    Modal.confirm({
      title: '确认重置？',
      content: '将恢复当前标签页默认配置，已填写内容会丢失',
      onOk: cb
    });
  };

  const testConnection = async () => {
    setTesting(true);
    setTimeout(() => {
      message.success('连接成功（Mock）');
      setTesting(false);
    }, 800);
  };

  const saveAll = async () => {
    setSaving(true);
    setTimeout(() => {
      message.success('配置已生效（Mock）');
      setSaving(false);
    }, 1000);
  };

  const items = [
    {
      key: 'vector',
      label: '向量库配置',
      children: (
        <Form
          form={vectorForm}
          layout="vertical"
          initialValues={defaultVector}
          onValuesChange={() => {}}
        >
          <Form.Item label="向量库类型" name="type" rules={[{ required: true }]}>
            <Select
              options={[
                { value: 'chroma', label: 'Chroma' },
                { value: 'milvus', label: 'Milvus' },
                { value: 'pgvector', label: 'PGVector' }
              ]}
            />
          </Form.Item>
          <Form.Item label="连接地址" name="host" rules={[{ required: true, message: '请输入连接地址' }]}>
            <Input placeholder="http://chroma:8000" />
          </Form.Item>
          <Form.Item label="账号" name="username">
            <Input placeholder="可选" />
          </Form.Item>
          <Form.Item label="密码" name="password">
            <Input.Password placeholder="可选" />
          </Form.Item>
          <Space>
            <Button loading={testing} onClick={testConnection} type="dashed">
              {testing ? '测试中...' : '测试连接'}
            </Button>
            <Button
              onClick={() =>
                resetConfirm(() => {
                  vectorForm.setFieldsValue(defaultVector);
                })
              }
            >
              重置
            </Button>
          </Space>
        </Form>
      )
    },
    {
      key: 'model',
      label: '模型配置',
      children: (
        <Form form={modelForm} layout="vertical" initialValues={defaultModel}>
          <Form.Item label="模型选择" name="provider" rules={[{ required: true }]}>
            <Select
              options={[
                { value: 'openai', label: 'GPT-3.5' },
                { value: 'qwen', label: '通义千问' },
                { value: 'wenxin', label: '文心一言' }
              ]}
            />
          </Form.Item>
          <Form.Item label="API Key" name="apiKey" rules={[{ required: true, message: '请输入 API Key' }]}>
            <Input.Password placeholder="sk-xxxx" />
          </Form.Item>
          <Form.Item label="请求超时（秒）" name="timeout">
            <InputNumber min={1} max={120} style={{ width: '100%' }} />
          </Form.Item>
          <Space>
            <Button type="dashed" onClick={() => message.success('测试调用成功（Mock）')}>
              测试调用
            </Button>
            <Button
              onClick={() =>
                resetConfirm(() => {
                  modelForm.setFieldsValue(defaultModel);
                })
              }
            >
              重置
            </Button>
          </Space>
        </Form>
      )
    },
    {
      key: 'rag',
      label: 'RAG 参数',
      children: (
        <Form form={ragForm} layout="vertical" initialValues={defaultRag}>
          <Form.Item
            label="默认 top_k"
            name="topk"
            extra="推荐3-5，越大召回越多但耗时更长"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} max={50} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="similarity_threshold" name="threshold" extra="0-1 之间，建议 0.6-0.8">
            <InputNumber min={0} max={1} step={0.01} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="rerank" name="rerank">
            <Select options={[{ value: 'on', label: '开启' }, { value: 'off', label: '关闭' }]} />
          </Form.Item>
          <Button
            onClick={() =>
              resetConfirm(() => {
                ragForm.setFieldsValue(defaultRag);
              })
            }
          >
            重置
          </Button>
        </Form>
      )
    },
    {
      key: 'cache',
      label: '缓存配置',
      children: (
        <Form form={cacheForm} layout="vertical" initialValues={defaultCache}>
          <Form.Item label="Redis 地址" name="redis" rules={[{ required: true }]}>
            <Input placeholder="redis://localhost:6379" />
          </Form.Item>
          <Form.Item label="缓存过期时间（秒）" name="expire">
            <InputNumber min={60} style={{ width: '100%' }} />
          </Form.Item>
          <Button
            onClick={() =>
              resetConfirm(() => {
                cacheForm.setFieldsValue(defaultCache);
              })
            }
          >
            重置
          </Button>
        </Form>
      )
    }
  ];

  return (
    <div>
      <div className="page-title">系统全局配置</div>
      <Card>
        <Tabs defaultActiveKey="vector" items={items} />
        <Space style={{ marginTop: 12 }}>
          <Button type="primary" loading={saving} onClick={saveAll}>
            {saving ? '保存中...' : '保存'}
          </Button>
          <Button
            onClick={() =>
              resetConfirm(() => {
                vectorForm.setFieldsValue(defaultVector);
                modelForm.setFieldsValue(defaultModel);
                ragForm.setFieldsValue(defaultRag);
                cacheForm.setFieldsValue(defaultCache);
              })
            }
          >
            参数重置
          </Button>
        </Space>
      </Card>
      <div className="section">
        <Card title="配置变更风险提示" extra="模拟数据">
          <MockChart title="近7日配置变更次数" percent={45} trend="flat" />
        </Card>
      </div>
    </div>
  );
};

export default SystemConfig;
