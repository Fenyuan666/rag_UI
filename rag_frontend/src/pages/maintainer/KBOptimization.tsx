import { Button, Card, Col, List, Row, Space, Tag } from 'antd';
import { kbVersions, missList } from '../../mock/data';
import MockChart from '../../components/MockChart';

const KBOptimization = () => {
  return (
    <div>
      <div className="page-title">知识库优化</div>
      <Row gutter={12}>
        <Col span={14}>
          <Card title="未命中问题">
            <List
              dataSource={missList}
              renderItem={(item) => (
                <List.Item actions={[<a key="add">补充内容</a>, <a key="done">标记已处理</a>, <a key="ignore">忽略</a>]}>
                  <List.Item.Meta title={item.content} description={`${item.user} · ${item.time}`} />
                  <Tag color={item.status === '未处理' ? 'red' : 'blue'}>{item.status}</Tag>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={10}>
          <Card title="重复内容检测">
            <MockChart title="重复文档/分块" percent={32} trend="down" />
            <Button style={{ marginTop: 12 }}>批量删除重复</Button>
          </Card>
          <Card title="知识库版本" style={{ marginTop: 12 }}>
            <List
              dataSource={kbVersions}
              renderItem={(item) => (
                <List.Item actions={[<a key="rollback">回滚</a>]}>
                  <List.Item.Meta title={`版本 ${item.version}`} description={`${item.time} · ${item.operator}`} />
                  <Tag>可回滚</Tag>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default KBOptimization;
