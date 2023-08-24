export interface CustomerState {
  isLoggedIn: boolean;
  currentUserFirstName: string;
  currentUserId: string;
}

export interface GlobalState {
  customer: CustomerState;
}
