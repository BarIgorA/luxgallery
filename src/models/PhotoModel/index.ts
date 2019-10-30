import { types, getParent } from 'mobx-state-tree';


const PhotoModel = types
  .model('PhotoModel', {
    albumId: types.number,
    id: types.number,
    thumbnailUrl: types.string,
    title: types.string,
    url: types.string,
  })
  .actions(self => ({
    showMe: (id: number): void => {
      getParent(self, 2).selectPhoto(id);
    },
    hideMe: (): void => {
      getParent(self, 2).deselectPhoto();
    },
  }));


export default PhotoModel;
