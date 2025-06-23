"use client";

import { useKanban } from '@/hooks/use-kanban';
import { KanbanBoard } from '@/components/kanban/kanban-board';

export default function KanbanPage() {
  const kanban = useKanban();

  return (
    <div className="min-h-screen">
      <KanbanBoard {...kanban} />
    </div>
  );
}