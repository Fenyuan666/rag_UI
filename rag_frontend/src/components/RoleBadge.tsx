import { Tag } from 'antd';
import type { Role } from '../types';

const roleLabel: Record<Role, { label: string; color: string }> = {
  super: { label: '超级管理员', color: 'red' },
  tenantAdmin: { label: '租户管理员', color: 'blue' },
  maintainer: { label: '知识库维护员', color: 'gold' },
  user: { label: '内部用户', color: 'green' }
};

const RoleBadge = ({ role }: { role: Role }) => {
  const info = roleLabel[role];
  return (
    <Tag color={info.color} style={{ fontWeight: 600 }}>
      {info.label}
    </Tag>
  );
};

export default RoleBadge;
