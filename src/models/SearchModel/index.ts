import { types } from 'mobx-state-tree';


const SearchModel = types.model('SearchModel', {
  searchTerm: types.string,
  timer: types.number,
  oldTimer: types.number,
  UISwitched: types.boolean,
})
.actions(self => ({
  takeLatest(e: any): void {
    e.persist();

    this.setTimer(
      window.setTimeout(() => {
        this.setSearchTerm(e.target.value.trim());
      },
      2500),
    );

    window.clearTimeout();
    self.oldTimer = self.timer;
  },
  setSearchTerm(value: string): void {
    self.UISwitched = !value;
    self.searchTerm = value;
  },
  setTimer(timer: number) {
    self.timer = timer;
  },
  falseUISwitched() {
    self.UISwitched = false;
  },
}));

const search = SearchModel.create({
  searchTerm: '',
  timer: 0,
  oldTimer: 0,
  UISwitched: true,
});


export default search;
