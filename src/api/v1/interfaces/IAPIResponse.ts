export interface IAPIResponse {
  status_code: number;
  success: boolean;
  data?: any;
  errors?: any;
}
