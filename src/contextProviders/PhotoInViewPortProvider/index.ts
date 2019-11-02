import IntersectionObserverContext from '../IntersectionObserverContext';


const provider = IntersectionObserverContext.Provider;
const options = {
  root: null,
  rootMargin: '100% 0px 100% 0px',
  threshold: 0.1,
};

const value = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // eslint-disable-next-line
      const img = <Element>entry.target.firstChild;
      if (!img) return;
      if (entry.isIntersecting) {
        img.classList.add('loaded');
        const src = entry.target.getAttribute('data-src') || '';
        img.setAttribute('src', src);
      } else {
        img.classList.remove('loaded');
        img.setAttribute('src', '');
      }
    });
  },
  options,
);

const PhotoInViewPortProvider = {
  provider,
  value,
};


export default PhotoInViewPortProvider;