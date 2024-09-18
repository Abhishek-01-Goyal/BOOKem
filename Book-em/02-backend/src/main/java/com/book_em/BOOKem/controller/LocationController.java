package com.book_em.BOOKem.controller;

import com.book_em.BOOKem.entity.Country;
import com.book_em.BOOKem.entity.State;
import com.book_em.BOOKem.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
public class LocationController {

    @Autowired
    private LocationService locationService;

    @GetMapping("/countries")
    public List<Country> getAllCountries() {
        return locationService.getAllCountries();
    }

    @GetMapping("/states/{countryId}")
    public List<State> getStatesByCountry(@PathVariable Long countryId) {
        return locationService.getStatesByCountry(countryId);
    }
}
