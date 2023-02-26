export class Appointment {
    userId: string
    scheduleId: string
  
    constructor(userId: string, scheduleId: string) {
      this.userId = userId
      this.scheduleId = scheduleId
    }
}