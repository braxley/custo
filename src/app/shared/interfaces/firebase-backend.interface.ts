import { CustoMovie } from './custo-movie.interfaces';

export interface AuthResponseData {
  displayName: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

export interface CustoBackendMoviesObject {
  [custoId: string]: CustoMovie;
}

export interface FriendData {
  hasAccepted: boolean;
  displayName: string;
}

export interface BackendFriendData {
  [userId: string]: FriendData;
}

export interface UserData {
  email: string;
  friends: BackendFriendData[] | null;
  displayName: string;
}

export interface BackendUserData {
  [userId: string]: UserData;
}
