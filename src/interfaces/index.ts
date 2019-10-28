// Models Types
import TabModel from '../models/TabModel';
// import PhotoModel from '../models/PhotoModel';
import AlbumModel from '../models/AlbumModel';
import { PhotosModel } from '../models/PhotosModel';

export interface IChildren {
  children: JSX.Element[] | JSX.Element;
};

export interface IntersectionObserve {
  observe(target: HTMLElement): void
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
