import { types, onPatch, getEnv } from 'mobx-state-tree';

// Utils
import request from '../../utils/request';
import api from '../../utils/api';

// Models Types
import AlbumModel from '../AlbumModel';
import PhotoModel from '../PhotoModel';

// Model for DI
import search from '../SearchModel';


export const PhotosModel = types
  .model('PhotosModel', {
    currentAlbum: types.number,
    photos: types.array(PhotoModel),
    albums: types.array(AlbumModel),
    allLoaded: types.boolean,
    loading: types.boolean,
  })
  .actions(self => ({
    afterCreate (): void {
      this.fetchAlbums();
      this.fetchChunk()
    },
    async fetchPhotos(): Promise<any> {
      try {
        this.setLoading(true);
        const { result }  = await request(api.getPhotosByAlbum(self.currentAlbum));
        this.setPhotos(result);
        const album = self.albums.find(album => album.id === self.currentAlbum);
        if (album) album.setLoaded();
      } catch(error) {
        console.log(error);
      } finally {
        this.setLoading(false);
      }
    },
    async fetchAlbums(): Promise<any> {
      try {
        this.setLoading(true);
        const { result }  = await request(api.getAllAlbums());
        this.setAlbums(result);
      } catch(error) {
        console.log(error);
      }
    },
    fetchChunk(): void {
      if (self.allLoaded) return;
      this.fetchPhotos();
    },
    setPhotos(photos: any[]) {
      if (photos && Array.isArray(photos) && photos.length) {
        self.photos.push(...photos);
      } else {
        self.allLoaded = true;
      }
    },
    setAlbums(albums: any[]) {
      self.albums.push(...albums);
    },
    tryLoadNext() {
      if (!self.loading) self.currentAlbum += 1;
    },
    setLoading(state: boolean) {
      self.loading = state;
    },
  }))
  .views(self => ({
    get inStorePhotos() {
      return self.photos.map(photo => photo);
    },
    get inStoreAlbums() {
      return self.albums.filter(album => album.loaded);
    },
    get AllAlbums() {
      return self.albums.map(albums => albums);
    },
    get isAllLoaded() {
      return self.allLoaded;
    },
    get searchTerm(): string {
      return getEnv(self).search.searchTerm
    },
    get lastLoadedAlbum() {
      return self.currentAlbum;
    },
    get isLoading() {
      return self.loading;
    },
  }));


const photos = PhotosModel.create({
  currentAlbum: 1,
  photos: [],
  albums: [],
  allLoaded: false,
  loading: false,
}, { search });

onPatch(photos, patch => {
  const { path }  = patch;
  if (path === '/currentAlbum') {
    photos.fetchChunk();
  }
});

export default photos;