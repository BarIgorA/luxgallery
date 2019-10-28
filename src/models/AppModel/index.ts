import { types } from 'mobx-state-tree';

// Models Types
import TabModel from '../TabModel';


export const AppModel = types.model('AppModel', {
  activeTabIndex: types.number,
  tabs: types.array(TabModel),
})
.actions(self => ({
  setActive: (id: number): void => {
    self.activeTabIndex = id;
  },
}))
.views(self => ({
  get activeComponent(): string {
    return self.tabs[self.activeTabIndex].component;
  },
}));

export default AppModel.create(
  {
    activeTabIndex: 0,
    tabs: [
      {
        id: 0,
        title: 'photo',
        icon: '<svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7l-3 3.72L9 13l-3 4h12l-4-5z"></path></svg>',
        component: 'Photos',
      },
      {
        id: 1,
        title: 'albums',
        icon: '<svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h5v7l2.5-1.88L18 11V4h2v12z"></path></svg>',
        component: 'Albums',
      },
    ],
  },
);