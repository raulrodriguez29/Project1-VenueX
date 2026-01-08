package com.venuex.backend.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "venues")
public class venue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(name = "location_id")
    private String Location;

    @Column(name = "venue_desc", columnDefinition = "TEXT")
    private String venueDescription;

    //constructors (only admins can add venues)
    public venue() {}
    public venue(String name, String location, String description){
        this.name = name;
        this.Location = location;
        this.venueDescription = description;
    }

    //Getters and Setters 
    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getLocation() {
        return Location;
    }

    public String getDescription() {
        return venueDescription;
    }

    //admin priviliages 
    public void setName(String name) {
        this.name = name;
    }

    public void setLocation(String location) {
        this.Location = location;
    }

    public void setDescription(String description) {
        this.venueDescription = description;
    }

}
