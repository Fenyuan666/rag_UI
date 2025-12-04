import { Card, Col, Row, Statistic, Progress, List, Button, Space, Badge } from 'antd';
import {
  ApartmentOutlined,
  DeploymentUnitOutlined,
  ThunderboltOutlined,
  CloudSyncOutlined
} from '@ant-design/icons';
import { alarmList, globalHealth, systemOverview } from '../../mock/data';
import MockChart from '../../components/MockChart';

const quickActions = [
  { label: '创建租户', icon: <ApartmentOutlined /> },
  { label: '全局配置', icon: <DeploymentUnitOutlined /> },
  { label: '数据备份', icon: <CloudSyncOutlined /> },
  { label: '模型连通性检测', icon: <ThunderboltOutlined /> }
];

const SuperDashboard = () => {
  return (
    <div>
      <div className="page-title">超级管理员 · 仪表盘</div>
      <Row gutter={12}>
        <Col span={6}>
          <Card>
            <Statistic title="租户总数" value={systemOverview.tenants} suffix="个" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="活跃租户" value={systemOverview.activeTenants} suffix="个" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="知识库总数" value={systemOverview.kbCount} suffix="个" />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="日均问答量" value={systemOverview.qaDaily} suffix="次" />
          </Card>
        </Col>
      </Row>

      <Row gutter={12} className="section">
        <Col span={16}>
          <Card title="系统健康">
            <Row gutter={12}>
              <Col span={8}>
                <Progress type="dashboard" percent={globalHealth.cpu} format={(p) => `CPU ${p}%`} />
              </Col>
              <Col span={8}>
                <Progress type="dashboard" percent={globalHealth.memory} format={(p) => `内存 ${p}%`} />
              </Col>
              <Col span={8}>
                <Progress type="dashboard" percent={globalHealth.disk} format={(p) => `磁盘 ${p}%`} />
              </Col>
            </Row>
            <Row gutter={12} style={{ marginTop: 12 }}>
              <Col span={12}>
                <MockChart title="向量库连通性" subtitle={`状态：${globalHealth.vector}`} />
              </Col>
              <Col span={12}>
                <MockChart title="模型接口连通性" subtitle={`状态：${globalHealth.model}`} />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="异常告警">
            <List
              dataSource={alarmList}
              renderItem={(item) => (
                <List.Item>
                  <Space>
                    <Badge status={item.level === 'error' ? 'error' : 'warning'} />
                    <div>{item.content}</div>
                    <div style={{ color: '#888' }}>{item.time}</div>
                  </Space>
                </List.Item>
              )}
            />
          </Card>
          <Card title="快捷操作" style={{ marginTop: 12 }}>
            <Space wrap>
              {quickActions.map((action) => (
                <Button key={action.label} icon={action.icon} type="default">
                  {action.label}
                </Button>
              ))}
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SuperDashboard;
