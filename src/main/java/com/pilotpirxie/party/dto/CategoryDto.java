package com.pilotpirxie.party.dto;

public record CategoryDto(
    String id,
    String language,
    String name,
    String description,
    String background,
    String audio,
    String primaryColor,
    String fontFamily
) {
}
