package com.example.md4exam.controller;

import com.example.md4exam.model.City;
import com.example.md4exam.service.impl.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@CrossOrigin("*")
@RequestMapping("/city")
public class CityController {
    @Autowired
    private CityService cityService;

    @GetMapping
    public ResponseEntity<Iterable<City>> findAll() {
        return new ResponseEntity<>(cityService.findAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<City> create(@RequestBody City city) {
        cityService.save(city);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<City> update(@PathVariable Long id,@RequestBody City city) {
        Optional<City> productOptional = cityService.findById(id);
        if (!productOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        city.setId(productOptional.get().getId());
        cityService.save(city);
        return new ResponseEntity<>(city,HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<City>> showUserShop(@PathVariable Long id) {
        return new ResponseEntity<>(cityService.findById(id),HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<City> delete(@PathVariable Long id) {
        cityService.remove(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
