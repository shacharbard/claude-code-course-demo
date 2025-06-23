"use client";

import { useState } from 'react';
import { Task } from '@/lib/kanban-types';
import { KanbanColumn } from './kanban-column';
import { AddTaskDialog } from './add-task-dialog';
import { EditTaskDialog } from './edit-task-dialog';

interface KanbanBoardProps {
  board: {
    columns: Array<{
      id: string;
      title: string;
      order: number;
      color?: string;
    }>;
    tasks: Task[];
  };
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'order'>) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  moveTask: (taskId: string, targetColumnId: string, targetOrder?: number) => void;
  getTasksByColumn: (columnId: string) => Task[];
  clearBoard: () => void;
}

export function KanbanBoard({
  board,
  addTask,
  updateTask,
  deleteTask,
  moveTask,
  getTasksByColumn,
  clearBoard,
}: KanbanBoardProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState<string>('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleAddTask = (columnId: string) => {
    setSelectedColumnId(columnId);
    setIsAddDialogOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleTaskSubmit = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'order'>) => {
    addTask(taskData);
    setIsAddDialogOpen(false);
    setSelectedColumnId('');
  };

  const handleTaskUpdate = (updates: Partial<Task>) => {
    if (editingTask) {
      updateTask(editingTask.id, updates);
      setEditingTask(null);
    }
  };

  const handleDeleteTask = (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8">
        {/* Board Header */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Project Board
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Manage your tasks efficiently
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  {board.tasks.length} Total Tasks
                </div>
                <div className="flex space-x-2">
                  {board.columns.map((column, index) => (
                    <div key={column.id} className="flex items-center space-x-1">
                      <div className={`w-3 h-3 rounded-full ${
                        index === 0 ? 'bg-amber-400' : 
                        index === 1 ? 'bg-blue-400' : 'bg-emerald-400'
                      }`}></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {getTasksByColumn(column.id).length}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <button
              onClick={clearBoard}
              className="px-6 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200 border border-red-200 dark:border-red-800/50 hover:border-red-300 dark:hover:border-red-700"
            >
              Clear Board
            </button>
          </div>
        </div>

        {/* Kanban Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[700px]">
          {board.columns
            .sort((a, b) => a.order - b.order)
            .map((column) => (
              <div key={column.id} className="flex flex-col">
                <KanbanColumn
                  column={column}
                  tasks={getTasksByColumn(column.id)}
                  onAddTask={handleAddTask}
                  onEditTask={handleEditTask}
                  onDeleteTask={handleDeleteTask}
                  onMoveTask={moveTask}
                />
              </div>
            ))}
        </div>
      </div>

      {/* Dialogs */}
      <AddTaskDialog
        isOpen={isAddDialogOpen}
        onClose={() => {
          setIsAddDialogOpen(false);
          setSelectedColumnId('');
        }}
        onSubmit={handleTaskSubmit}
        defaultColumnId={selectedColumnId}
        columns={board.columns}
      />

      <EditTaskDialog
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        onSubmit={handleTaskUpdate}
        task={editingTask}
        columns={board.columns}
      />
    </div>
  );
}