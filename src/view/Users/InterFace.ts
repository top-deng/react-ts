import {Page} from '@entity/FormEnter'
import { Loading } from '@services/Interfaces'
interface tableItem {
  id: string,
  userName?: string,
  action?: any,
}
interface Data{
  page: Page
  data: Array<tableItem>,
}
export interface IEntranceProps {
  res: Data,
  loading: Loading,
  dispatch?: any;
}
