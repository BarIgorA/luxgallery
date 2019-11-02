import { types } from 'mobx-state-tree';


const PhotoModel = types
  .model('PhotoModel', {
    albumId: types.number,
    id: types.number,
    thumbnailUrl: types.string,
    title: types.string,
    url: types.string,
    expanded: false,
  })
  .actions(self => ({
    showMe: (): void => {
      self.expanded = true;
    },
    hideMe: (): void => {
      self.expanded = false;
    },
  }))
  .views(self => ({
    get isPhotoExpanded() {
      return self.expanded;
    },
  })
  );


export default PhotoModel;
