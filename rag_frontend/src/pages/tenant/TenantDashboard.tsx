import { Card, Col, List, Row, Statistic } from 'antd';
import { hotQuestions, missQuestions, tenantOverview } from '../../mock/data';
import MockChart from '../../components/MockChart';

const TenantDashboard = () => {
  return (
    <div>
      <div className="page-title">租户管理员 · 仪表盘</div>
      <Row gutter={12}>
        <Col span={6}>
          <Card>
            <Statistic title="用户数" value={tenantOverview.users} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="知识库数" value={tenantOverview.knowledgeBase} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="今日问答量" value={tenantOverview.qaToday} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="未命中问题" value={tenantOverview.miss} suffix="条" />
          </Card>
        </Col>
      </Row>

      <Row gutter={12} className="section">
        <Col span={14}>
          <Card title="问答效果趋势（近7天）">
            <MockChart title="问答量" percent={78} />
            <MockChart title="准确率" percent={91} trend="flat" subtitle="示意数据" />
          </Card>
        </Col>
        <Col span={10}>
          <Card title="热门问题 TOP5" style={{ marginBottom: 12 }}>
            <List
              dataSource={hotQuestions}
              renderItem={(item) => (
                <List.Item>
                  {item.question}
                  <span style={{ color: '#888' }}>{item.hits}</span>
                </List.Item>
              )}
            />
          </Card>
          <Card title="未命中问题 TOP5">
            <List
              dataSource={missQuestions}
              renderItem={(item) => (
                <List.Item>
                  {item.question}
                  <span style={{ color: '#888' }}>{item.count}</span>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TenantDashboard;
