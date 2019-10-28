class ApiUrl {
  constructor(private baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getAllAlbums(): string {
    return `${this.baseUrl}/albums`;
  }

  getAlbumById(id: number): string {
    return `${this.getAllAlbums()}/${id}`;
  }

  getAllPhotos(): string {
    return `${this.baseUrl}/photos`;
  }

  getPhotosByAlbum(id: number): string {
    return `${this.getAllPhotos()}?albumId=${id}`;
  }
}

export default new ApiUrl('https://jsonplaceholder.typicode.com');
