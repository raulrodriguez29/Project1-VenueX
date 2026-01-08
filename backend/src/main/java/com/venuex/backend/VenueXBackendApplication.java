package com.venuex.backend;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.venuex.backend.entities.Notification;
import com.venuex.backend.repository.NotificationRepository;

@SpringBootApplication
public class VenueXBackendApplication {

	private static final Logger logger = LoggerFactory.getLogger(VenueXBackendApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(VenueXBackendApplication.class, args);
	}

	@Bean
	public CommandLineRunner demo(NotificationRepository repo) {
		return (args) -> {
			Notification newNotification = new Notification();
			newNotification.setUserId(1);
			newNotification.setType("EMAIL");
			newNotification.setMessage("I like notifications");
			repo.save(newNotification);
			//repo.save(new notification(2, "text", "I like notifications too"));

			logger.info("All Notifications:");
			logger.info("------------------");
			repo.findAll().forEach(notification -> {
				logger.info(notification.toString());
			});
/* 
			notification searchNotif
			logger.info("Notification found with Id 1");
			logger.info("----------------------------");
			logger.info(searchNotif.toString());
*/		};

	}

}
