package com.in28minutes.microservices.currencyexchangeservice;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/exchanges")
public class CurrencyExchangeController {

    private Logger logger = LoggerFactory.getLogger(CurrencyExchangeController.class);

    @Autowired
    private CurrencyExchangeRepository repository;

    @GetMapping
    public List<CurrencyExchange> getExchanges() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public CurrencyExchange getExchanges(@PathVariable Long id) {
        return repository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity createExchange(@RequestBody CurrencyExchange client) throws URISyntaxException {
        CurrencyExchange savedClient = repository.save(client);
        return ResponseEntity.created(new URI("/exchanges/" + savedClient.getId())).body(savedClient);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateExchange(@PathVariable Long id, @RequestBody CurrencyExchange exchange) {
        CurrencyExchange currentClient = repository.findById(id).orElseThrow(RuntimeException::new);
        currentClient.setFrom(exchange.getFrom());
        currentClient.setTo(exchange.getTo());
        currentClient = repository.save(currentClient);

        return ResponseEntity.ok(currentClient);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteExchange(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
