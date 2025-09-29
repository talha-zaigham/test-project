import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Tag, MoreVertical } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in-progress' | 'completed';
  assignee: string;
  dueDate: Date;
  tags: string[];
  aiScore: number;
}

interface TaskCardProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'todo': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-md border border-gray-200 p-4 hover:shadow-lg transition-shadow duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {task.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2">
            {task.description}
          </p>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical size={16} />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
          {task.priority.toUpperCase()}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
          {task.status.replace('-', ' ').toUpperCase()}
        </span>
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span>AI Score: {task.aiScore}/100</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <User size={14} />
            <span>{task.assignee}</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={14} />
          <span>2h 30m</span>
        </div>
      </div>

      {task.tags.length > 0 && (
        <div className="flex items-center gap-1 mt-3">
          <Tag size={14} className="text-gray-400" />
          <div className="flex gap-1 flex-wrap">
            {task.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 pt-4 border-t border-gray-200"
        >
          <div className="space-y-2">
            <div>
              <label className="text-sm font-medium text-gray-700">AI Insights</label>
              <p className="text-sm text-gray-600">
                Based on your work patterns, this task should be prioritized due to its impact on the project timeline.
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600">
                Start Task
              </button>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md hover:bg-gray-200">
                Edit
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TaskCard;
