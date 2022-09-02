import React from 'react';

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

export interface IAlertModal {
  titleText : string | null;
  contentText : string | null;
  onClickEvent : React.MouseEventHandler<HTMLElement>;
}
