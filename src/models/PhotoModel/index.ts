import { types, getParent } from 'mobx-state-tree';


const PhotoModel = types
  .model('PhotoModel', {
    albumId: types.number,
    id: types.number,
    thumbnailUrl: types.string,
    title: types.string,
    url: types.string,
  })
  .views(self => ({
    getAlbum() {
      return getParent(self, 2).albums.find((item: { id: number; }) => item.id === self.albumId);
    },
  }));


export default PhotoModel;
