/**
 * User account entity.
 */
interface User {
  /** Schema version for migration handling */
  version: number
  /** Firebase Auth UID */
  uid: string
  /** User's primary email */
  email: string
  /** Subscription plan tier */
  plan: 'free' | 'bronze' | 'silver' | 'gold' | 'platinum'

  /** References to external resources */
  refs: {
    /** root folder ID or Drive ID associated with the user */
    drive: string
  }

  /** Account creation timestamp */
  createdAt: Date
  /** Last profile update timestamp */
  updatedAt: Date
  /** Last login timestamp */
  lastLoginAt: Date

  /** Access control status */
  access: {
    /** Current account status */
    status: 'active' | 'suspended' | 'banned' | 'deleted'
    /** Reason for non-active status */
    reason?: string
    /** Date when suspension/ban expires */
    expiresAt?: Date
    /** Admin/System ID who changed the status */
    changedBy?: string
  }

  /** Arbitrary metadata */
  meta?: Record<string, any>
}
