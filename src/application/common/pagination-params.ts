export interface PaginationParams {
  page: number;
  orderBy?: {
    field: string;
    direction: 'asc' | 'desc';
  };
}
