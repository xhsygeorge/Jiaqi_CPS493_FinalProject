import { api } from "./session";

export function getProducts() {
  return api<ListEnvelope<Activity>>('activities');
}

export function getProduct(id: string) {
  return api<Activity>(`activities/${id}`)
}

export function addProduct(activity: Activity) {
  return api<Activity>(`activities`, activity);
}

export function updateProduct(id: string, activity: Activity) {
  return api<Activity>(`activityies/${id}`, activity, 'PATCH');
}

export function deleteProduct(id: string) {
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
    id: number,
    profileohoto: string,
    name: string,
    username: string,
    activityname: string,
    activityphoto: string,
    date: string,
    intro: string
  }