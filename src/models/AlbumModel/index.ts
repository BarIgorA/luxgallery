import { types, getParent } from 'mobx-state-tree';

// Utils
import request from '../../utils/request';
import api from '../../utils/api';

// Models Types
import PhotoModel from '../PhotoModel';

const AlbumModel = types
  .model('AlbumModel', {
    userId: types.number,
    id: types.number,
    title: types.string,
    photos: types.array(PhotoModel),
    loaded: false,
    expanded: false,
  })
  .actions(self => ({
    setLoaded(): void {
      self.loaded = true;
    },
    expandMe(): void {
      self.expanded = true;
      if (!self.loaded) {
        this.fetchAlbumsPhotos();
      }
    },
    closeMe(): void {
      self.expanded = false;
    },
    async fetchAlbumsPhotos() : Promise<any> {
      try {
        const { result }  = await request(api.getPhotosByAlbum(self.id));
        this.setPhotos(result);
      } catch(error) {
        console.log(error);
      }
    },
    setPhotos(photos: any[]): void {
      if (photos && Array.isArray(photos) && photos.length) {
        self.photos.push(...photos);
      }
    },
  }))
  .views(self => ({
    get albumsPhotos() {
      if (self.loaded) {
        return getParent(self, 2).photos.filter((photo: { albumId: number; }) => photo.albumId === self.id);
      }
      return self.photos.map(photo => photo);
    }
  }));


export default AlbumModel;
