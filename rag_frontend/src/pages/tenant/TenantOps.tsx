import { Card, Col, DatePicker, Row, Select, Space, Button } from 'antd';
import MockChart from '../../components/MockChart';

const TenantOps = () => {
  return (
    <div>
      <div className="page-title">租户运营统计</div>
      <Card>
        <Space style={{ marginBottom: 12 }} wrap>
          <DatePicker.RangePicker />
          <Select placeholder="知识库筛选" style={{ width: 200 }} options={[{ value: 'all', label: '全部知识库' }]} />
          <Button type="primary">导出数据</Button>
        </Space>
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
            <Card title="导出">
              <MockChart title="数据导出示意" percent={30} trend="up" />
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default TenantOps;
