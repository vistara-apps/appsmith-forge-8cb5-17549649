
// Simple in-memory storage for demo purposes
// In production, this would use Supabase or another database

interface User {
  farcasterId: string
  createdAt: string
  tierLevel: 'free' | 'basic' | 'pro'
  appCount: number
}

interface App {
  id: string
  userId: string
  prompt: string
  generatedCode: string
  deployedUrl?: string
  miniappType: string
  createdAt: string
  updatedAt: string
  monetizationEnabled: boolean
  monetizationType?: string
  monetizationDetails?: any
}

interface AppVersion {
  id: string
  appId: string
  versionNumber: number
  generatedCode: string
  commitMessage: string
  createdAt: string
}

class MemoryStorage {
  private users: Map<string, User> = new Map()
  private apps: Map<string, App> = new Map()
  private versions: Map<string, AppVersion[]> = new Map()

  // User methods
  getUser(farcasterId: string): User | null {
    return this.users.get(farcasterId) || null
  }

  createUser(farcasterId: string): User {
    const user: User = {
      farcasterId,
      createdAt: new Date().toISOString(),
      tierLevel: 'free',
      appCount: 0
    }
    this.users.set(farcasterId, user)
    return user
  }

  updateUser(farcasterId: string, updates: Partial<User>): User | null {
    const user = this.users.get(farcasterId)
    if (!user) return null

    const updated = { ...user, ...updates }
    this.users.set(farcasterId, updated)
    return updated
  }

  // App methods
  createApp(userId: string, appData: Omit<App, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): App {
    const id = `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const app: App = {
      id,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...appData
    }
    
    this.apps.set(id, app)
    
    // Update user app count
    const user = this.users.get(userId)
    if (user) {
      this.updateUser(userId, { appCount: user.appCount + 1 })
    }
    
    return app
  }

  getApp(id: string): App | null {
    return this.apps.get(id) || null
  }

  getUserApps(userId: string): App[] {
    return Array.from(this.apps.values())
      .filter(app => app.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  updateApp(id: string, updates: Partial<App>): App | null {
    const app = this.apps.get(id)
    if (!app) return null

    const updated = { 
      ...app, 
      ...updates, 
      updatedAt: new Date().toISOString() 
    }
    this.apps.set(id, updated)
    return updated
  }

  // Version methods
  createVersion(appId: string, code: string, commitMessage: string): AppVersion {
    const versions = this.versions.get(appId) || []
    const version: AppVersion = {
      id: `ver_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      appId,
      versionNumber: versions.length + 1,
      generatedCode: code,
      commitMessage,
      createdAt: new Date().toISOString()
    }
    
    versions.push(version)
    this.versions.set(appId, versions)
    return version
  }

  getAppVersions(appId: string): AppVersion[] {
    return this.versions.get(appId) || []
  }
}

export const storage = new MemoryStorage()

// Initialize with a demo user
storage.createUser('demo_user')
