import type { Role } from '../types';

export const mockCurrentUser = {
  name: 'Alex 管理员',
  role: 'super' as Role,
  tenant: 'Acme 租户'
};

export const systemOverview = {
  tenants: 42,
  activeTenants: 31,
  kbCount: 128,
  qaDaily: 8650
};

export const globalHealth = {
  cpu: 62,
  memory: 55,
  disk: 71,
  vector: '正常',
  model: '正常'
};

export const alarmList = [
  { id: 1, level: 'warning', content: '向量检索延迟逼近阈值', time: '09:12' },
  { id: 2, level: 'error', content: '租户 acme 存储用量超过 80%', time: '07:43' }
];

export const tenants = [
  {
    name: 'Acme Group',
    contact: 'alice@acme.com',
    createdAt: '2023-11-12',
    status: 'active',
    quota: '64G / 128G'
  },
  {
    name: 'Nova Tech',
    contact: 'bob@nova.com',
    createdAt: '2024-01-05',
    status: 'disabled',
    quota: '12G / 64G'
  }
];

export const auditLogs = new Array(12).fill(0).map((_, i) => ({
  id: i + 1,
  actor: i % 2 === 0 ? '系统' : '运营A',
  role: i % 2 === 0 ? 'super' : 'tenantAdmin',
  tenant: i % 2 === 0 ? '-' : 'Acme',
  action: i % 3 === 0 ? '修改全局配置' : '创建租户用户',
  time: `2024-03-0${(i % 9) + 1} 10:${(i % 50)
    .toString()
    .padStart(2, '0')}`,
  ip: `10.1.0.${i + 10}`,
  result: i % 4 === 0 ? '失败' : '成功'
}));

export const backups = [
  { time: '2024-03-02 02:00', type: '全量', status: '完成', size: '2.4GB' },
  { time: '2024-03-03 02:00', type: '增量', status: '进行中', size: '540MB' }
];

export const tenantOverview = {
  users: 182,
  knowledgeBase: 23,
  qaToday: 812,
  miss: 26
};

export const qaTrends = [
  { date: '周一', qa: 620, accuracy: 0.88 },
  { date: '周二', qa: 750, accuracy: 0.9 },
  { date: '周三', qa: 710, accuracy: 0.86 },
  { date: '周四', qa: 830, accuracy: 0.91 },
  { date: '周五', qa: 780, accuracy: 0.89 },
  { date: '周六', qa: 650, accuracy: 0.87 },
  { date: '周日', qa: 590, accuracy: 0.85 }
];

export const hotQuestions = [
  { question: '如何上传新的产品手册？', hits: 123 },
  { question: '数据备份在哪里配置？', hits: 98 },
  { question: '如何添加外部联系人？', hits: 76 }
];

export const missQuestions = [
  { question: 'SLA 报表如何下载？', count: 18 },
  { question: '模型调用失败怎么办？', count: 12 }
];

export const tenantUsers = [
  {
    name: '陈立',
    account: 'chenli',
    role: 'tenantAdmin',
    status: 'active',
    createdAt: '2023-12-01',
    lastLogin: '2024-03-02 15:20'
  },
  {
    name: '李明',
    account: 'liming',
    role: 'user',
    status: 'disabled',
    createdAt: '2023-12-11',
    lastLogin: '2024-02-22 10:03'
  }
];

export const knowledgeBases = [
  {
    name: '产品手册库',
    docs: 124,
    createdAt: '2023-10-12',
    status: 'active',
    scope: '全租户'
  },
  {
    name: '内部 FAQ',
    docs: 45,
    createdAt: '2024-01-09',
    status: 'active',
    scope: '指定角色'
  }
];

export const qaLogs = new Array(10).fill(0).map((_, i) => ({
  id: i + 1,
  user: '张三',
  question: '怎么处理报错 502？',
  answer: '请检查网络连通性并重试。',
  time: `2024-03-02 14:${(10 + i).toString().padStart(2, '0')}`,
  hit: i % 3 !== 0
}));

export const documents = [
  { name: '产品手册V2.pdf', type: 'PDF', size: '12MB', uploadedAt: '2024-02-12' },
  { name: '安装指南.docx', type: 'Word', size: '4MB', uploadedAt: '2024-02-18' }
];

export const missList = [
  { content: '如何启用多租户 SSO？', user: '李雷', time: '2024-03-02', status: '未处理' },
  { content: '知识库导出失败', user: '韩梅', time: '2024-03-01', status: '处理中' }
];

export const kbVersions = [
  { version: '1.2.0', time: '2024-02-20', operator: '王伟', action: '可回滚' },
  { version: '1.1.0', time: '2024-02-10', operator: '王伟', action: '可回滚' }
];

export const chatHistory = [
  { id: 1, title: 'FAQ 收集', updatedAt: '今天 13:02' },
  { id: 2, title: '产品对比', updatedAt: '昨天 09:14' }
];

export const kbSearchResults = [
  { name: '部署指南', kb: '产品手册库', preview: '部署步骤与依赖...' },
  { name: 'FAQ 经典问题', kb: '内部 FAQ', preview: '如何处理 429...' }
];
