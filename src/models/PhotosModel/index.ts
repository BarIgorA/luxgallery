import { types } from 'mobx-state-tree';

import request from '../../utils/request';

// Models Types
import AlbumModel from '../AlbumModel';
import PhotoModel from '../PhotoModel';


export const PhotosModel = types
  .model('PhotosModel', {
    currentAlbum: types.number,
    photos: types.array(PhotoModel),
    albums: types.array(AlbumModel),
    allLoaded: types.boolean,
  })
  .actions(self => ({
    async afterCreate (): Promise<any> {
      this.fetchAlbum();
      this.fetchPhotos();
    },
    async fetchPhotos(): Promise<any> {
      try {
        const { result }  = await request(`https://jsonplaceholder.typicode.com/photos?albumId=${self.currentAlbum}`);
        this.setPhotos(result);
      } catch(error) {
        console.log(error);
      }
    },
    async fetchAlbum(): Promise<any> {
      try {
        const { result }  = await request(`https://jsonplaceholder.typicode.com/albums/${self.currentAlbum}`);
        this.setAlbum(result);
      } catch(error) {
        console.log(error);
      }
    },
    setPhotos(photos: any[]) {
      self.photos.push(...photos);
    },
    setAlbum(album: any) {
      self.albums.push(album);
    },
  }))
  .views(self => ({
    get inStorePhotos() {
      return self.photos.map(photo => photo);
    },
    get inStoreAlbum() {
      return self.albums.map(album => album);
    },
  }));


export default PhotosModel.create({
  currentAlbum: 1,
  photos: [],
  albums: [],
  allLoaded: false,
});
