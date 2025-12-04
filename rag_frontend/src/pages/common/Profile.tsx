import { Card, Col, Divider, Form, Input, Row, Switch, Button, Space, Avatar, List, Typography } from 'antd';
import { LockOutlined, BellOutlined, BgColorsOutlined, HistoryOutlined } from '@ant-design/icons';

const { Text } = Typography;

const Profile = () => {
  const sessions = [
    { title: '今天 14:20', description: 'Web · Chrome · 上海' },
    { title: '昨天 09:15', description: '移动端 · iOS' }
  ];

  return (
    <div>
      <div className="page-title">个人中心</div>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="个人信息" bordered={false}>
            <Space size="large" align="start">
              <Avatar size={72} src="https://dummyimage.com/120x120" />
              <Space direction="vertical" size={6}>
                <div>
                  <div style={{ fontWeight: 700 }}>Alex 管理员</div>
                  <Text type="secondary">角色：根据当前登录角色显示</Text>
                </div>
                <Text>所属租户：Acme</Text>
                <Button type="link" size="small">
                  更新头像
                </Button>
              </Space>
            </Space>
          </Card>
        </Col>
        <Col span={16}>
          <Card title="安全设置" bordered={false} extra={<LockOutlined />}>
            <Form layout="vertical">
              <Row gutter={12}>
                <Col span={12}>
                  <Form.Item label="绑定手机">
                    <Input placeholder="138****8888" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="绑定邮箱">
                    <Input placeholder="admin@company.com" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="修改密码">
                <Input.Password placeholder="输入新密码" />
              </Form.Item>
              <Button type="primary">保存安全设置</Button>
            </Form>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} className="section">
        <Col span={12}>
          <Card title="个性化设置" bordered={false} extra={<BgColorsOutlined />}>
            <Form layout="vertical">
              <Form.Item label="问答界面主题">
                <Input placeholder="默认主题，可自定义" />
              </Form.Item>
              <Form.Item label="通知偏好">
                <Space>
                  <Switch /> <Text>新问答通知</Text>
                  <Switch defaultChecked /> <Text>系统公告</Text>
                </Space>
              </Form.Item>
              <Button type="primary">保存偏好</Button>
            </Form>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="会话管理" bordered={false} extra={<HistoryOutlined />}>
            <List
              dataSource={sessions}
              renderItem={(item) => (
                <List.Item actions={[<a key="clear">清除</a>]}>
                  <List.Item.Meta title={item.title} description={item.description} />
                </List.Item>
              )}
            />
            <Divider />
            <Button icon={<BellOutlined />} block>
              清除个人历史对话
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
