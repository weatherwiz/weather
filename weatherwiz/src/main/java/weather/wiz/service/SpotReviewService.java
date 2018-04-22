package weather.wiz.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import weather.wiz.entity.SpotReview;
import weather.wiz.repository.SpotReviewRepository;

@Service
public class SpotReviewService {
	@Autowired
	private SpotReviewRepository repository;

	public void saveSpotReview(SpotReview spotReview) {
		repository.save(spotReview);
	}
	
	public List<SpotReview> getAllSpotReviews() {
		return repository.findAll();
	}
}
