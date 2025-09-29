export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'todo' | 'in-progress' | 'completed' | 'cancelled';
  assignee: string;
  dueDate: Date;
  tags: string[];
  aiScore: number;
  estimatedTime: number;
  actualTime?: number;
  dependencies: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: UserPreferences;
  role: 'admin' | 'manager' | 'member';
  teamId?: string;
  createdAt: Date;
  lastActive: Date;
}

export interface UserPreferences {
  workHours: {
    start: number; // Hour in 24h format
    end: number;
  };
  breakDuration: number; // in minutes
  focusTime: number; // in minutes
  notifications: {
    email: boolean;
    push: boolean;
    desktop: boolean;
  };
  theme: 'light' | 'dark' | 'auto';
  language: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  members: string[];
  projects: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  teamId: string;
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  startDate: Date;
  endDate?: Date;
  tasks: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TimeEntry {
  id: string;
  taskId: string;
  userId: string;
  startTime: Date;
  endTime: Date;
  description?: string;
  tags: string[];
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'task_assigned' | 'task_due' | 'task_completed' | 'team_update' | 'system';
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

export interface Dashboard {
  userId: string;
  widgets: Widget[];
  layout: Layout;
  lastUpdated: Date;
}

export interface Widget {
  id: string;
  type: 'task_list' | 'calendar' | 'analytics' | 'team_activity' | 'ai_insights';
  position: { x: number; y: number; w: number; h: number };
  config: Record<string, any>;
  data?: any;
}

export interface Layout {
  columns: number;
  rows: number;
  gap: number;
}

export interface AIInsight {
  id: string;
  type: 'productivity' | 'scheduling' | 'collaboration' | 'efficiency';
  title: string;
  description: string;
  confidence: number;
  actionable: boolean;
  suggestions: string[];
  createdAt: Date;
}

export interface Analytics {
  userId: string;
  period: 'day' | 'week' | 'month' | 'year';
  metrics: {
    tasksCompleted: number;
    totalTime: number;
    productivityScore: number;
    focusTime: number;
    breakTime: number;
    efficiency: number;
  };
  insights: AIInsight[];
  trends: {
    productivity: number[];
    completion: number[];
    focus: number[];
  };
  createdAt: Date;
}

export interface Integration {
  id: string;
  name: string;
  type: 'calendar' | 'email' | 'slack' | 'github' | 'jira';
  config: Record<string, any>;
  enabled: boolean;
  lastSync: Date;
  userId: string;
}

export interface Webhook {
  id: string;
  url: string;
  events: string[];
  secret: string;
  active: boolean;
  createdAt: Date;
  lastTriggered?: Date;
}

export interface APIKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  lastUsed?: Date;
  expiresAt?: Date;
  userId: string;
  createdAt: Date;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  details: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
}

export interface Settings {
  id: string;
  key: string;
  value: any;
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  description: string;
  category: string;
  updatedAt: Date;
  updatedBy: string;
}

export interface ErrorLog {
  id: string;
  level: 'error' | 'warning' | 'info' | 'debug';
  message: string;
  stack?: string;
  context: Record<string, any>;
  userId?: string;
  timestamp: Date;
}

export interface PerformanceMetric {
  id: string;
  endpoint: string;
  method: string;
  responseTime: number;
  statusCode: number;
  timestamp: Date;
  userId?: string;
}

export interface CacheEntry {
  key: string;
  value: any;
  ttl: number;
  createdAt: Date;
  expiresAt: Date;
}

export interface DatabaseConnection {
  id: string;
  name: string;
  type: 'mongodb' | 'postgresql' | 'mysql' | 'redis';
  config: Record<string, any>;
  status: 'connected' | 'disconnected' | 'error';
  lastChecked: Date;
}

export interface Backup {
  id: string;
  name: string;
  type: 'full' | 'incremental' | 'differential';
  size: number;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
  location: string;
}

export interface Deployment {
  id: string;
  version: string;
  environment: 'development' | 'staging' | 'production';
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'rolled_back';
  startedAt: Date;
  completedAt?: Date;
  deployedBy: string;
  changes: string[];
  rollbackVersion?: string;
}

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  conditions: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
  updatedBy: string;
}

export interface RateLimit {
  id: string;
  key: string;
  limit: number;
  window: number; // in seconds
  current: number;
  resetAt: Date;
  userId?: string;
  ipAddress?: string;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
  lastActivity: Date;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'free' | 'basic' | 'pro' | 'enterprise';
  status: 'active' | 'cancelled' | 'expired' | 'pending';
  startDate: Date;
  endDate?: Date;
  features: string[];
  billingCycle: 'monthly' | 'yearly';
  price: number;
  currency: string;
}

export interface Payment {
  id: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  method: 'card' | 'bank_transfer' | 'paypal' | 'stripe';
  transactionId: string;
  processedAt: Date;
  createdAt: Date;
}

export interface SupportTicket {
  id: string;
  userId: string;
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  category: 'bug' | 'feature_request' | 'billing' | 'technical' | 'general';
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  resolvedAt?: Date;
}

export interface Feedback {
  id: string;
  userId: string;
  type: 'bug_report' | 'feature_request' | 'improvement' | 'complaint' | 'praise';
  title: string;
  description: string;
  rating: number; // 1-5
  status: 'new' | 'reviewed' | 'in_progress' | 'resolved' | 'closed';
  createdAt: Date;
  updatedAt: Date;
  response?: string;
  respondedBy?: string;
  respondedAt?: Date;
}
