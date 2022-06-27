import { AxiosRequestConfig } from 'axios';
import { Action } from 'redux';

/** API MIDDLEWARE | apiCallBegan action payload */
export interface ApiCallBeganPayload extends AxiosRequestConfig {
  type: string;
  onStart: string;
  onSuccess: string;
  onPostSuccess: string;
  onError: string;
}

/** API MIDDLEWARE | apiCallBegan action */
export interface ApiAction extends Action {
  payload: ApiCallBeganPayload;
}

/** LAYOUT COMPONENT | Layout Props */
export interface LayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
  children: React.ReactElement;
}
