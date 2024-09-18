package com.book_em.BOOKem.service;

import com.book_em.BOOKem.dao.CountryRepository;
import com.book_em.BOOKem.dao.StateRepository;
import com.book_em.BOOKem.entity.Country;
import com.book_em.BOOKem.entity.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    @Autowired
    private CountryRepository countryRepository;

    @Autowired
    private StateRepository stateRepository;

    // Get all countries
    public List<Country> getAllCountries() {
        return countryRepository.findAll();
    }

    // Get states based on country id
    public List<State> getStatesByCountry(Long countryId) {
        return stateRepository.findByCountryId(countryId);
    }
}
