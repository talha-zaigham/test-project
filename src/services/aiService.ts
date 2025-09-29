import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface TaskAnalysis {
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimatedTime: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  dependencies: string[];
  suggestions: string[];
  aiScore: number;
}

export interface TaskSuggestion {
  title: string;
  description: string;
  priority: string;
  estimatedTime: number;
  reasoning: string;
}

class AIService {
  /**
   * Analyze a task and provide AI-powered insights
   */
  async analyzeTask(task: {
    title: string;
    description: string;
    context?: string;
  }): Promise<TaskAnalysis> {
    try {
      const prompt = `
        Analyze the following task and provide insights:
        
        Title: ${task.title}
        Description: ${task.description}
        Context: ${task.context || 'No additional context'}
        
        Please provide:
        1. Priority level (low, medium, high, urgent)
        2. Estimated time in minutes
        3. Difficulty level (easy, medium, hard)
        4. Dependencies (list of other tasks this depends on)
        5. Suggestions for improvement
        6. AI confidence score (0-100)
        
        Respond in JSON format.
      `;

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an AI task management assistant. Analyze tasks and provide actionable insights.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 500
      });

      const analysis = JSON.parse(response.choices[0].message.content || '{}');
      
      return {
        priority: analysis.priority || 'medium',
        estimatedTime: analysis.estimatedTime || 60,
        difficulty: analysis.difficulty || 'medium',
        dependencies: analysis.dependencies || [],
        suggestions: analysis.suggestions || [],
        aiScore: analysis.aiScore || 75
      };
    } catch (error) {
      console.error('Error analyzing task:', error);
      throw new Error('Failed to analyze task with AI');
    }
  }

  /**
   * Generate task suggestions based on project context
   */
  async generateTaskSuggestions(projectContext: {
    projectType: string;
    currentTasks: string[];
    goals: string[];
  }): Promise<TaskSuggestion[]> {
    try {
      const prompt = `
        Based on the following project context, suggest relevant tasks:
        
        Project Type: ${projectContext.projectType}
        Current Tasks: ${projectContext.currentTasks.join(', ')}
        Goals: ${projectContext.goals.join(', ')}
        
        Suggest 3-5 relevant tasks that would help achieve the project goals.
        For each task, provide:
        - Title
        - Description
        - Priority (low, medium, high, urgent)
        - Estimated time in minutes
        - Reasoning for why this task is important
        
        Respond in JSON format with an array of tasks.
      `;

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an AI project management assistant. Suggest relevant tasks based on project context.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 800
      });

      const suggestions = JSON.parse(response.choices[0].message.content || '[]');
      return suggestions;
    } catch (error) {
      console.error('Error generating task suggestions:', error);
      throw new Error('Failed to generate task suggestions');
    }
  }

  /**
   * Optimize task scheduling based on user patterns
   */
  async optimizeSchedule(tasks: Array<{
    id: string;
    title: string;
    priority: string;
    estimatedTime: number;
    deadline?: Date;
  }>, userPreferences: {
    workHours: { start: number; end: number };
    breakDuration: number;
    focusTime: number;
  }): Promise<Array<{
    taskId: string;
    scheduledTime: Date;
    duration: number;
    reasoning: string;
  }>> {
    try {
      const prompt = `
        Optimize the following task schedule based on user preferences:
        
        Tasks: ${JSON.stringify(tasks)}
        User Preferences: ${JSON.stringify(userPreferences)}
        
        Consider:
        - Task priorities
        - Estimated time
        - Deadlines
        - User work patterns
        - Break times
        
        Provide an optimized schedule with reasoning for each task.
        Respond in JSON format.
      `;

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an AI scheduling assistant. Optimize task schedules for maximum productivity.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 1000
      });

      const schedule = JSON.parse(response.choices[0].message.content || '[]');
      return schedule;
    } catch (error) {
      console.error('Error optimizing schedule:', error);
      throw new Error('Failed to optimize schedule');
    }
  }

  /**
   * Generate natural language task descriptions
   */
  async generateTaskDescription(naturalLanguageInput: string): Promise<{
    title: string;
    description: string;
    priority: string;
    estimatedTime: number;
    tags: string[];
  }> {
    try {
      const prompt = `
        Convert the following natural language input into a structured task:
        
        Input: "${naturalLanguageInput}"
        
        Extract and structure:
        - Task title
        - Detailed description
        - Priority level
        - Estimated time in minutes
        - Relevant tags
        
        Respond in JSON format.
      `;

      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an AI task parsing assistant. Convert natural language into structured tasks.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 400
      });

      const task = JSON.parse(response.choices[0].message.content || '{}');
      return task;
    } catch (error) {
      console.error('Error generating task description:', error);
      throw new Error('Failed to generate task description');
    }
  }
}

export default new AIService();
