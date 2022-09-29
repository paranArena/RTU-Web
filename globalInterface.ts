import React from 'react';

export interface IAddGroup {
  name: string ;
  thumbnail : string;
  hashtags: string | string[];
  introduction: string;
}

export interface IAlertModal {
  type : 'alert' | 'info';
  top : 10 | 30;
  titleText : string | null;
  contentText? : string | null;
  button? : boolean;
  onClickButtonEvent? :React.MouseEventHandler<HTMLButtonElement>;
  onClickEvent : React.MouseEventHandler<HTMLElement>;
}

export interface ClubDataModal {
  id : number;
  clubRole : string;
  hashtags : string[];
  introduction : string;
  name : string;
  clubMemberSize:number;
  thumbnailPath : string;
}

export interface RentalItemModal {
  clubId : number;
  name : string;
  id : number;
  max : number;
  left : number;
  imagePath : string;
}

export interface IClubMember {
  id : number;
  email : string;
  name : string;
  phoneNumber : string;
  studentId : string;
  major : string;
  clubRole : 'USER' | 'OWNER' | 'WAIT' | 'ADMIN' | 'NONE';
}

// rental product 렌탈 물품
export interface IRentalProduct {
  id : number;
  name :string;
  clubId : number;
  clubName : string;
  category : string;
  imagePath : string;
  left : number;
  max : number;
}

// club notice 공지사항
export interface IClubNotice {
  id : number;
  clubId : number;
  title : string;
  imagePath : string;
  isPublic : boolean;
  createdAt : string;
  updatedAt : string;
}

// Product
export interface IClubProduct {
  id : number;
  clubId : number;
  name : string;
  category: string;
  imagePath : string;
  left : number;
  max : number;
}

export interface Location {
  name: string;
  latitude : number;
  longitude : number;
}

export interface IClubRentalHistory {
  expDate : null | string;
  id : number;
  memberName : string;
  numbering : number;
  productName : string;
  rentDate : string;
  rentalStatus : 'CANCEL' | 'DONE' ;
}
