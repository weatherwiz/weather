package weather.wiz.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import weather.wiz.entity.SpotReview;
import weather.wiz.service.SpotReviewService;

@RestController
@RequestMapping(value = "/")
public class SpotReviewController {
	@Autowired
	SpotReviewService service;
	
	@RequestMapping(method = RequestMethod.POST, value = "/spotreview/save")
	public void saveUser(@RequestBody SpotReview spotReview) {
		service.saveSpotReview(spotReview);
	}
}
