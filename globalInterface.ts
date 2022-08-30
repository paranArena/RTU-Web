export interface IAddGroup {
  groupName: string ;
  tags: string;
  introduce: string;
}

export interface IRentItemCurrentInfo {
  name : string;
  lender : string | null;
  rentDate : string | null;
  type : '선착순' | '기간제';
}
