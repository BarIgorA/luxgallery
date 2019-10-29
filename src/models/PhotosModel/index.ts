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
    selectedPhoto: types.optional(types.maybeNull(types.number), null),
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
      if (photos && Array.isArray(photos) && photos.length) {
        self.photos.push(...photos);
      } else {
        self.allLoaded = true;
      }
    },
    setAlbum(album: any) {
      if (album &&album.id) {
        self.albums.push(album);
      } else {
        self.allLoaded = true;
      }
    },
    tryLoadNext() {
      self.currentAlbum += 1;
    },
    selectPhoto(photoId: number) {
      self.selectedPhoto = photoId;
    }
  }))
  .views(self => ({
    get inStorePhotos() {
      return self.photos.map(photo => photo);
    },
    get inStoreAlbum() {
      return self.albums.map(album => album);
    },
    get isAllLoaded() {
      return self.allLoaded;
    },
    get photoToShow() {
      if (self.selectedPhoto) {
        return self.photos.find(photo => photo.id === self.selectedPhoto);
      } else {
        return null;
      }
    },
  }));


const photos = PhotosModel.create({
  currentAlbum: 1,
  photos: [],
  albums: [],
  selectedPhoto: null,
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