export interface Singer {
    name: string;
    profileImage: string;
    bio: string;
  }
  
  export interface Genre {
    genre: string;
    singers: Singer[];
  }
  