import { api } from "./session";

export function getActivities() {
  return api<ListEnvelope<Activity>>('activities');
}

export function getActivity(id: string) {
  return api<Activity>(`activities/${id}`)
}

export function addActivity(activity: Activity) {
  return api<Activity>(`activities`, activity);
}

export function updateActivity(id: string, activity: Activity) {
  return api<Activity>(`activities/${id}`, activity, 'PATCH');
}

export function deleteActivity(id: string) {
  return api<{deletedCount:boolean}>(`activities/${id}`,{}, 'DELETE');
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
