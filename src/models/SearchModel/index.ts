import { types, onPatch } from 'mobx-state-tree';


const SearchModel = types.model('SearchModel', {
  searchTerm: types.string,
  timer: types.number,
  oldTimer: types.number,
})
.actions(self => ({
  takeLatest(e: any): void {
    e.persist();

    if (e.target.value.length < 3) {
      window.clearTimeout(self.oldTimer);
      return;
    }

    this.setTimer(
      window.setTimeout(() => {
        this.setSearchTerm(e.target.value.trim());
      },
      1200),
    );

    window.clearTimeout();
    self.oldTimer = self.timer;
  },
  setSearchTerm(value: string): void {
    self.searchTerm = value;
  },
  setTimer(timer: number) {
    self.timer = timer;
  },
}));

const search = SearchModel.create({
  searchTerm: '',
  timer: 0,
  oldTimer: 0,
});


export default search;

onPatch(search, patch => {
  console.log('Search: ', patch);
});