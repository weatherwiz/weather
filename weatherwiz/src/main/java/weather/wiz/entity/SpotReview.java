package weather.wiz.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
public class SpotReview {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long spotReviewId;
	private String userName;
	private int rating;
	private String city;
	private String reviewComment;
	
	public SpotReview() {
		super();
	}

	public Long getSpotReviewId() {
		return spotReviewId;
	}

	public void setSpotReviewId(Long spotReviewId) {
		this.spotReviewId = spotReviewId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getReviewComment() {
		return reviewComment;
	}

	public void setReviewComment(String reviewComment) {
		this.reviewComment = reviewComment;
	}
}
