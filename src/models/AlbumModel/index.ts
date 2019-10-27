import { types } from 'mobx-state-tree';

const AlbumModel = types
  .model('AlbumModel', {
    userId: types.number,
    id: types.number,
    title: types.string,
  });


export default AlbumModel;
