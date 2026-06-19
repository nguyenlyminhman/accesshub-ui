export const departmentKeys = {
  all: ['departments'] as const,
  lists: () => [...departmentKeys.all, 'list'] as const,
  list: (filters: any) => [...departmentKeys.lists(), filters] as const,
  detail: (id: string) => [...departmentKeys.all, 'detail', id] as const,
};
