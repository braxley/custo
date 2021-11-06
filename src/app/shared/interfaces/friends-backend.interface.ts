export interface BackendFriendData {
  [userId: string]: boolean;
}

export interface BackendUserData {
  userId: { user_data: { email: string } };
}
