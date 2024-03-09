export interface user {
  username: string,
  firstname: string,
  lastname: string,
  bio: string
}

export interface post {
  id?: string
  image_path: string
  caption?: string
  user_name: string
}