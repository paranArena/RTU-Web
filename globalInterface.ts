import React from 'react';

export interface IAddGroup {
  name: string ;
  thumbnail : string;
  hashtags: string | string[];
  introduction: string;
}

export interface IRentItemCurrentInfo {
  name : string;
  lender : string | null;
  rentDate : string | null;
  type : '선착순' | '기간제';
}

export interface IAlertModal {
  titleText : string | null;
  contentText? : string | null;
  onClickEvent : React.MouseEventHandler<HTMLElement>;
}

export interface ClubDataModal {
  id : number;
  clubRole : string;
  hashtags : string[];
  introduction : string;
  name : string;
  thumbnailPath : string;
}

export interface RentalItemModal {
  clubId : number;
  name : string;
  id : number;
  maxQuantity : number;
  quantity : number;
  thumbnailPath : string;
}
