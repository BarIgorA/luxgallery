import { types, getParent } from 'mobx-state-tree';
import { MouseEvent } from 'react';


const TabModel = types
  .model('TabModel', {
    id: types.number,
    title: types.string,
    icon: types.string,
    component: types.string,
    showSearch: types.boolean,
  })
  .actions(self => ({
    setActive: (e: MouseEvent): void => {
      e.preventDefault();
      getParent(self, 2).setActive(self.id);
    },
  }))
  .views(self => ({
    amIActive: (): boolean => getParent(self, 2).activeTabIndex === self.id,
  }));


export default TabModel;
