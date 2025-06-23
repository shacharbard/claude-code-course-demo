"use client";

import { Task } from '@/lib/kanban-types';
import { cn } from '@/lib/utils';
import { Calendar, Tag, Edit, Trash2 } from 'lucide-react';

interface KanbanCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  isDragging?: boolean;
}

const priorityColors = {
  low: 'border-l-emerald-400 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30',
  medium: 'border-l-amber-400 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30', 
  high: 'border-l-rose-400 bg-gradient-to-r from-rose-50 to-red-50 dark:from-rose-950/30 dark:to-red-950/30',
};

export function KanbanCard({ task, onEdit, onDelete, isDragging }: KanbanCardProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({
      taskId: task.id,
      sourceColumnId: task.columnId,
    }));
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className={cn(
        "group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl border-l-4 shadow-lg hover:shadow-xl transition-all duration-300 cursor-move",
        "p-5 border border-white/50 dark:border-gray-700/50",
        task.priority && priorityColors[task.priority],
        isDragging && "opacity-60 rotate-3 scale-105",
        "hover:scale-[1.02] hover:-translate-y-1"
      )}
    >
      {/* Task Content */}
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="font-bold text-gray-900 dark:text-gray-100 leading-tight text-lg">
            {task.title}
          </h3>
          
          {/* Actions Menu */}
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-200">
            <div className="flex items-center space-x-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(task);
                }}
                className="p-2 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all duration-200 hover:scale-110"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(task.id);
                }}
                className="p-2 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-all duration-200 hover:scale-110"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {task.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed bg-gray-50/50 dark:bg-gray-900/20 rounded-lg p-3">
            {task.description}
          </p>
        )}

        {/* Tags */}
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {task.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 dark:from-indigo-900/50 dark:to-purple-900/50 dark:text-indigo-300 shadow-sm"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <Calendar className="w-3 h-3 mr-1" />
            {task.createdAt.toLocaleDateString()}
          </div>
          
          {task.priority && (
            <span className={cn(
              "px-3 py-1 rounded-full text-xs font-bold shadow-sm",
              task.priority === 'high' && "bg-gradient-to-r from-red-100 to-rose-100 text-red-700 dark:from-red-900/50 dark:to-rose-900/50 dark:text-red-300",
              task.priority === 'medium' && "bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 dark:from-yellow-900/50 dark:to-amber-900/50 dark:text-yellow-300",
              task.priority === 'low' && "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 dark:from-green-900/50 dark:to-emerald-900/50 dark:text-green-300"
            )}>
              {task.priority.toUpperCase()}
            </span>
          )}
        </div>
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent dark:from-white/5 rounded-2xl pointer-events-none"></div>
    </div>
  );
}