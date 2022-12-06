import { api } from "./session";

export function getActivities() {
  return api<ListEnvelope<Activity>>('activities');
}

export function getactivity(id: string) {
  return api<Activity>(`activities/${id}`)
}

export interface ListEnvelope<T> {
  activities: T[]
  total: number
  skip: number
  limit: number
}
  
export interface Activity {
  _id:string
  id: number
  profilephoto: string
  name: string
  username: string
  activityname:string
  activityphoto: string
  date: Date
  intro: string
}
