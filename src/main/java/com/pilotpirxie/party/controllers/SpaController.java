package com.pilotpirxie.party.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {
    @GetMapping("/game/**")
    public String redirect() {
        return "forward:/index.html";
    }
}