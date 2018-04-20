package weather.wiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import weather.wiz.entity.SpotReview;

@Repository
public interface SpotReviewRepository extends JpaRepository<SpotReview, Long>{
	
}
