"use client";

import { useState } from 'react';
import { Task, Column } from '@/lib/kanban-types';
import { KanbanCard } from './kanban-card';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

interface KanbanColumnProps {
  column: Column;
  tasks: Task[];
  onAddTask: (columnId: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onMoveTask: (taskId: string, targetColumnId: string, targetOrder?: number) => void;
}

export function KanbanColumn({
  column,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onMoveTask,
}: KanbanColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only set isDragOver to false if we're leaving the column entirely
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    try {
      const dragData = JSON.parse(e.dataTransfer.getData('text/plain'));
      const { taskId, sourceColumnId } = dragData;

      if (sourceColumnId !== column.id) {
        onMoveTask(taskId, column.id);
      }
    } catch (error) {
      console.error('Failed to parse drag data:', error);
    }
  };

  const getColumnStyle = () => {
    switch (column.id) {
      case 'todo':
        return 'from-amber-400 to-orange-400';
      case 'in-progress':
        return 'from-blue-400 to-indigo-400';
      case 'done':
        return 'from-emerald-400 to-green-400';
      default:
        return 'from-gray-400 to-slate-400';
    }
  };

  const getColumnBg = () => {
    switch (column.id) {
      case 'todo':
        return 'bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20';
      case 'in-progress':
        return 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20';
      case 'done':
        return 'bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20';
      default:
        return 'bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-950/20 dark:to-slate-950/20';
    }
  };

  return (
    <div className="flex flex-col h-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 dark:border-gray-700/50 overflow-hidden">
      {/* Column Header */}
      <div className={cn(
        "relative p-5 bg-gradient-to-r text-white shadow-sm",
        `bg-gradient-to-r ${getColumnStyle()}`
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-white/80 rounded-full shadow-sm"></div>
            <h2 className="font-bold text-lg text-white drop-shadow-sm">
              {column.title}
            </h2>
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-white">
                {tasks.length}
              </span>
            </div>
          </div>

          <button
            onClick={() => onAddTask(column.id)}
            className="p-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Column Body - Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "flex-1 p-4 transition-all duration-300 min-h-[500px]",
          getColumnBg(),
          isDragOver && "ring-2 ring-purple-400 dark:ring-purple-500 ring-opacity-50 bg-purple-100/50 dark:bg-purple-900/30 scale-[1.02]"
        )}
      >
        {/* Tasks */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <KanbanCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))}
        </div>

        {/* Empty State */}
        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-gray-500 dark:text-gray-400">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center mb-4 shadow-inner">
              <div className="text-2xl opacity-60">📝</div>
            </div>
            <p className="text-sm font-medium mb-2">No tasks yet</p>
            <button
              onClick={() => onAddTask(column.id)}
              className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/20 px-4 py-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
            >
              Add your first task
            </button>
          </div>
        )}

        {/* Drop Zone Indicator */}
        {isDragOver && (
          <div className="absolute inset-4 border-2 border-dashed border-purple-400 dark:border-purple-500 rounded-xl flex items-center justify-center bg-purple-50/80 dark:bg-purple-900/20 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-purple-600 dark:text-purple-400 font-semibold text-lg mb-1">
                Drop task here
              </div>
              <div className="text-purple-500 dark:text-purple-500 text-sm">
                Release to add to {column.title}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}