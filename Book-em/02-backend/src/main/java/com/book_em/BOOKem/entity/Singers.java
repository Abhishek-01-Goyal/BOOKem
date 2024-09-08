package com.book_em.BOOKem.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "singers")
public class Singers {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "singer_id")
	private Long singerId;

	@OneToOne
	@JoinColumn(name = "user_id", referencedColumnName = "user_id")
	private Users user;

	@Column(name = "name")
	private String name;

	@Column(name = "bio", length = 1000)
	private String bio;

	@Column(name = "genre")
	private String genre;

	@Column(name = "rating")
	private Double rating;

	@Column(name = "price_per_hour")
	private Double pricePerHour;

	@Column(name = "profile_image")
	private String profileImage;

	@Column(name = "location")
	private String location;

	@Column(name = "availability")
	private String availability;

	// Getters and Setters


	public Long getSingerId() {
		return singerId;
	}

	public void setSingerId(Long singerId) {
		this.singerId = singerId;
	}

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}

	public Double getRating() {
		return rating;
	}

	public void setRating(Double rating) {
		this.rating = rating;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public Double getPricePerHour() {
		return pricePerHour;
	}

	public void setPricePerHour(Double pricePerHour) {
		this.pricePerHour = pricePerHour;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getProfileImage() {
		return profileImage;
	}

	public void setProfileImage(String profileImage) {
		this.profileImage = profileImage;
	}

	public String getAvailability() {
		return availability;
	}

	public void setAvailability(String availability) {
		this.availability = availability;
	}
}
