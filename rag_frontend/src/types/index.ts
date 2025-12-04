export type Role =
  | 'super'
  | 'tenantAdmin'
  | 'maintainer'
  | 'user';

export interface RouteMeta {
  title: string;
  roles: Role[];
}
