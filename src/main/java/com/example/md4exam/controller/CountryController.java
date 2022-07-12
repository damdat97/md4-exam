package com.example.md4exam.controller;

import com.example.md4exam.model.Country;
import com.example.md4exam.service.impl.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@CrossOrigin("*")
@RequestMapping("/country")
public class CountryController {
    @Autowired
    private CountryService countryService;

    @GetMapping
    public ResponseEntity<Iterable<Country>> findAll() {
        return new ResponseEntity<>(countryService.findAll(), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<Country> create(@RequestBody Country country) {
        countryService.save(country);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Country> update(@PathVariable Long id,@RequestBody Country country) {
        Optional<Country> productOptional = countryService.findById(id);
        if (!productOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        country.setId(productOptional.get().getId());
        countryService.save(country);
        return new ResponseEntity<>(country,HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Country>> showUserShop(@PathVariable Long id) {
        return new ResponseEntity<>(countryService.findById(id),HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Country> delete(@PathVariable Long id) {
        countryService.remove(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
