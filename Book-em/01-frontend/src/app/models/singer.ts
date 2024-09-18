export interface Singer {
  profile_image: string;
  singerId: number; // Ensure this matches the API response
  name: string;
  bio: string;
  profileImage: string;
  genre: string;
  pricePerHour: number;
  rating: number;
  location: string;
}
