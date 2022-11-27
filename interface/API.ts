import { ROLE } from '../globalType';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface MY_CLUB {
  id: number;
  name: string;
  introduction: string;
  thumbnailPath: string;
  hashtags: string[];
  clubRole: ROLE;
  clubMemberSize: number;
}
