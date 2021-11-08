export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

export interface BackendFriendData {
  [userId: string]: boolean;
}

export interface BackendUserData {
  userId: { user_data: { email: string } };
}
