import { types, onPatch } from 'mobx-state-tree';

// Utils
import request from '../../utils/request';
import api from '../../utils/api';

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
    afterCreate (): void {
      this.fetchChunk();
    },
    async fetchPhotos(): Promise<any> {
      try {
        const { result }  = await request(api.getPhotosByAlbum(self.currentAlbum));
        this.setPhotos(result);
      } catch(error) {
        console.log(error);
      }
    },
    async fetchAlbum(): Promise<any> {
      try {
        const { result }  = await request(api.getAlbumById(self.currentAlbum));
        this.setAlbum(result);
      } catch(error) {
        console.log(error);
      }
    },
    fetchChunk(): void {
      if (self.allLoaded) return;
      this.fetchAlbum();
      this.fetchPhotos();
    },
    setPhotos(photos: any[]) {
      self.photos.push(...photos);
    },
    setAlbum(album: any) {
      self.albums.push(album);
    },
    tryLoadNext() {
      self.currentAlbum += 1;
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


const photos = PhotosModel.create({
  currentAlbum: 1,
  photos: [],
  albums: [],
  allLoaded: false,
});

onPatch(photos, patch => {
  const { path }  = patch;
  if (path === '/currentAlbum') {
    photos.fetchChunk();
    console.log(photos.currentAlbum);
  }
});

export default photos;