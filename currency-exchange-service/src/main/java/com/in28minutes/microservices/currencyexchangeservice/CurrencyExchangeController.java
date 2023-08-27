package com.in28minutes.microservices.currencyexchangeservice;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CurrencyExchangeController {

    private Logger logger = LoggerFactory.getLogger(CurrencyExchangeController.class);

    @Autowired
    private CurrencyExchangeRepository repository;

    @Autowired
    private Environment environment;

    @GetMapping("/currency-exchange/from/{from}/to/{to}")
    public CurrencyExchange retrieveExchangeValue(
            @PathVariable String from,
            @PathVariable String to) {

        logger.info("retrieveExchangeValue called with {} to {}", from, to);

        CurrencyExchange currencyExchange
                = repository.findByFromAndTo(from, to);

        if (currencyExchange == null) {
            throw new RuntimeException
                    ("Unable to Find data for " + from + " to " + to);
        }

        String port = environment.getProperty("local.server.port");
        currencyExchange.setEnvironment(port);

        return currencyExchange;

    }

    @GetMapping("/currency-exchange")
    public List<CurrencyExchange> retrieveAllExchangeValue() {

        logger.info("retrieveAllExchangeValue called ");

        List<CurrencyExchange> currencyExchangeList
                = repository.findAll();

        if (currencyExchangeList.isEmpty()) {
            throw new RuntimeException
                    ("Unable to Find data ");
        }
        return currencyExchangeList;

    }

    @PostMapping("/currency-exchange/insert")
    public CurrencyExchange addCurrencyExchange(@RequestBody CurrencyExchange newCurrencyExchange) {
        logger.info("addCurrencyExchange called ");
        repository.save(newCurrencyExchange);
        return newCurrencyExchange;
    }

}
