import { api } from "./session";

export function getFriends() {
  return api<ListEnvelope<Friend>>('friends');
}

export function getFriend(id: number) {
  return api<Friend>(`friends/${id}`)
}

export interface ListEnvelope<T> {
  friends: T[]
  total: number
  skip: number
  limit: number
}
  
export interface Friend {
  id: number
  name: string
  username: string
  smallphoto: string
  images: string[]
  bio: string
}
