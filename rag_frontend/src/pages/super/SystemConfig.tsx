import { Button, Card, Form, Input, InputNumber, Select, Space, Tabs } from 'antd';
import MockChart from '../../components/MockChart';

const SystemConfig = () => {
  const items = [
    {
      key: 'vector',
      label: '向量库配置',
      children: (
        <Form layout="vertical">
          <Form.Item label="向量库类型">
            <Select defaultValue="milvus" options={[{ value: 'milvus', label: 'Milvus' }, { value: 'pg', label: 'PgVector' }]} />
          </Form.Item>
          <Form.Item label="连接地址">
            <Input placeholder="http://127.0.0.1:19530" />
          </Form.Item>
          <Form.Item label="账号密码">
            <Input.Password placeholder="可为空" />
          </Form.Item>
          <Button type="primary">测试连接</Button>
        </Form>
      )
    },
    {
      key: 'model',
      label: '模型配置',
      children: (
        <Form layout="vertical">
          <Form.Item label="模型提供商">
            <Select defaultValue="openai" options={[{ value: 'openai', label: 'OpenAI' }, { value: 'dashscope', label: '通义' }]} />
          </Form.Item>
          <Form.Item label="API Key">
            <Input.Password placeholder="sk-xxxx" />
          </Form.Item>
          <Form.Item label="请求超时（秒）">
            <InputNumber min={1} defaultValue={30} />
          </Form.Item>
          <Button type="primary">测试调用</Button>
        </Form>
      )
    },
    {
      key: 'rag',
      label: 'RAG 参数',
      children: (
        <Form layout="vertical">
          <Form.Item label="默认 top_k">
            <InputNumber min={1} max={50} defaultValue={6} />
          </Form.Item>
          <Form.Item label="similarity_threshold">
            <InputNumber min={0} max={1} step={0.01} defaultValue={0.65} />
          </Form.Item>
          <Form.Item label="rerank">
            <Select defaultValue="on" options={[{ value: 'on', label: '开启' }, { value: 'off', label: '关闭' }]} />
          </Form.Item>
        </Form>
      )
    },
    {
      key: 'cache',
      label: '缓存配置',
      children: (
        <Form layout="vertical">
          <Form.Item label="Redis 地址">
            <Input placeholder="redis://localhost:6379" />
          </Form.Item>
          <Form.Item label="缓存过期时间（秒）">
            <InputNumber min={60} defaultValue={600} />
          </Form.Item>
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
          <Button type="primary">保存</Button>
          <Button>参数重置</Button>
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
