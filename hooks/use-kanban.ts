"use client";

import { useState, useEffect } from 'react';
import { Task, Column, KanbanBoard } from '@/lib/kanban-types';

const DEFAULT_COLUMNS: Column[] = [
  { id: 'todo', title: 'To Do', order: 0, color: 'bg-slate-200' },
  { id: 'in-progress', title: 'In Progress', order: 1, color: 'bg-blue-200' },
  { id: 'done', title: 'Done', order: 2, color: 'bg-green-200' },
];

const STORAGE_KEY = 'kanban-board';

export function useKanban() {
  const [board, setBoard] = useState<KanbanBoard>({
    columns: DEFAULT_COLUMNS,
    tasks: [],
  });

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        const tasks = parsed.tasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
        }));
        setBoard({ ...parsed, tasks });
      } catch (error) {
        console.error('Failed to parse stored kanban data:', error);
      }
    }
  }, []);

  // Save to localStorage whenever board changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
  }, [board]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'order'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      order: getNextOrderInColumn(task.columnId),
    };

    setBoard(prev => ({
      ...prev,
      tasks: [...prev.tasks, newTask],
    }));
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setBoard(prev => ({
      ...prev,
      tasks: prev.tasks.map(task =>
        task.id === taskId
          ? { ...task, ...updates, updatedAt: new Date() }
          : task
      ),
    }));
  };

  const deleteTask = (taskId: string) => {
    setBoard(prev => ({
      ...prev,
      tasks: prev.tasks.filter(task => task.id !== taskId),
    }));
  };

  const moveTask = (taskId: string, targetColumnId: string, targetOrder?: number) => {
    setBoard(prev => {
      const task = prev.tasks.find(t => t.id === taskId);
      if (!task) return prev;

      const tasksInTargetColumn = prev.tasks.filter(t => 
        t.columnId === targetColumnId && t.id !== taskId
      );

      const newOrder = targetOrder ?? tasksInTargetColumn.length;

      // Update task column and order
      const updatedTasks = prev.tasks.map(t => {
        if (t.id === taskId) {
          return {
            ...t,
            columnId: targetColumnId,
            order: newOrder,
            updatedAt: new Date(),
          };
        }
        
        // Reorder other tasks in target column if necessary
        if (t.columnId === targetColumnId && t.order >= newOrder) {
          return { ...t, order: t.order + 1 };
        }
        
        return t;
      });

      return {
        ...prev,
        tasks: updatedTasks,
      };
    });
  };

  const getTasksByColumn = (columnId: string) => {
    return board.tasks
      .filter(task => task.columnId === columnId)
      .sort((a, b) => a.order - b.order);
  };

  const getNextOrderInColumn = (columnId: string) => {
    const tasksInColumn = getTasksByColumn(columnId);
    return tasksInColumn.length;
  };

  const clearBoard = () => {
    setBoard({
      columns: DEFAULT_COLUMNS,
      tasks: [],
    });
  };

  return {
    board,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    getTasksByColumn,
    clearBoard,
  };
}