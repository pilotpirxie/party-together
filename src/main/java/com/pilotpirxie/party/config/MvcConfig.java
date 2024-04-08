package com.pilotpirxie.party.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class MvcConfig implements WebMvcConfigurer {
    private final Path rootLocation = Paths.get("uploads");
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry
            .addResourceHandler("/uploads/*.jpg", "/uploads/*.jpeg")
            .addResourceLocations("file:" + rootLocation.toAbsolutePath() + "/");
    }
}