import { types } from 'mobx-state-tree';

const AlbumModel = types
  .model('AlbumModel', {
    userId: types.number,
    id: types.number,
    title: types.string,
    loaded: false,
  })
  .actions(self => ({
    setLoaded(): void {
      self.loaded = true;
    },
  }));


export default AlbumModel;
