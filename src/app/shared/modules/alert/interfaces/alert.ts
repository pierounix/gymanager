export interface Alert {
  type: string;  // type if our alert. It may be 'success, danger, infor'
  time: number;   // life time of alert
  message: string;   // Message that we want to show in alert
}
