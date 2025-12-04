import { Progress, Space, Typography } from 'antd';

interface MockChartProps {
  title: string;
  subtitle?: string;
  trend?: 'up' | 'down' | 'flat';
  percent?: number;
}

const MockChart = ({ title, subtitle, trend = 'up', percent = 70 }: MockChartProps) => {
  const { Text } = Typography;
  const colors = {
    up: '#1677ff',
    down: '#fa541c',
    flat: '#8c8c8c'
  };

  return (
    <div className="chart-placeholder">
      <Space direction="vertical" size={6} style={{ width: '100%' }}>
        <Space>
          <Text strong>{title}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {subtitle}
          </Text>
        </Space>
        <Progress
          percent={percent}
          strokeColor={colors[trend]}
          trailColor="rgba(22, 119, 255, 0.08)"
          size="small"
        />
      </Space>
    </div>
  );
};

export default MockChart;
