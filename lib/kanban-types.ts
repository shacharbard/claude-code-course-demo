export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string;
  columnId: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  priority?: Priority;
  tags?: string[];
}

export interface Column {
  id: string;
  title: string;
  order: number;
  color?: string;
}

export interface KanbanBoard {
  columns: Column[];
  tasks: Task[];
}

export interface DragItem {
  taskId: string;
  sourceColumnId: string;
}