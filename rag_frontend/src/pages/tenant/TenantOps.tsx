import { Card, Col, DatePicker, Row, Select, Space, Button, Form, message } from 'antd';
import MockChart from '../../components/MockChart';

const TenantOps = () => {
  const [form] = Form.useForm();

  const onExport = () => {
    message.success('已导出当前筛选结果（Mock）');
  };

  return (
    <div>
      <div className="page-title">租户运营统计</div>
      <Card>
        <Form form={form} layout="inline" style={{ marginBottom: 12 }}>
          <Form.Item label="时间范围" name="range" initialValue={[]}>
            <DatePicker.RangePicker />
          </Form.Item>
          <Form.Item label="知识库筛选" name="kb">
            <Select
              mode="multiple"
              allowClear
              placeholder="全部知识库"
              style={{ width: 240 }}
              options={[{ value: 'all', label: '全部知识库' }, { value: 'faq', label: '内部FAQ' }, { value: 'manual', label: '产品手册' }]}
            />
          </Form.Item>
          <Form.Item label="命中状态" name="hit" initialValue="all">
            <Select
              style={{ width: 120 }}
              options={[
                { value: 'all', label: '全部' },
                { value: 'hit', label: '命中' },
                { value: 'miss', label: '未命中' }
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary">筛选</Button>
              <Button onClick={() => form.resetFields()}>重置</Button>
              <Button type="dashed" onClick={onExport}>
                导出数据
              </Button>
            </Space>
          </Form.Item>
        </Form>
        <Row gutter={12}>
          <Col span={12}>
            <Card title="问答量趋势（日/周/月）">
              <MockChart title="周维度问答量" percent={72} />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="知识库访问热力">
              <MockChart title="文档访问热度" percent={64} trend="flat" />
            </Card>
          </Col>
        </Row>
        <Row gutter={12} className="section">
          <Col span={12}>
            <Card title="未命中问题分析">
              <MockChart title="问题分类占比" percent={48} trend="down" />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="未命中问题列表（Top10）">
              <MockChart title="列表导出示意" percent={30} trend="up" />
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default TenantOps;
