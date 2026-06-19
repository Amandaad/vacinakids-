export type ReminderType = 'upcoming' | 'overdue';

export interface Reminder {
  id: string;
  vaccinationId: string;
  childId: string;
  type: ReminderType;
  title: string;
  message: string;
  scheduledDate: Date;
  sent: boolean;
  sentAt?: Date;
  createdAt: Date;
}
