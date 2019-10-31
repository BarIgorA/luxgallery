// Models Types
import TabModel from '../models/TabModel';
import PhotoModel from '../models/PhotoModel';
import AlbumModel from '../models/AlbumModel';
import { PhotosModel } from '../models/PhotosModel';


export interface IChildren {
  children: (JSX.Element | null)[] | JSX.Element | null;
};

export interface ITabs {
  tabs: typeof TabModel.Type[];
};

export interface IPhotos {
  data: typeof PhotosModel.Type;
};

export interface IContent {
  photos: typeof PhotosModel.Type;
  component: string;
};

export interface IPhoto {
  photo: typeof PhotoModel.Type;
};

export interface IModalPhoto {
  photo: typeof PhotoModel.Type | null | undefined;
};

export type TAlbum = typeof AlbumModel.Type;

export type TPhoto = typeof PhotoModel.Type;
