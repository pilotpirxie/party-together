package com.pilotpirxie.party.dto.events.incoming;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CreateNewGameEvent(
    @Size(min = 1, max = 16)
    String nickname,

    @Size(min = 7, max = 7)
    @Pattern(regexp = "^#[0-9a-fA-F]{6}$")
    String color,

    @Min(0)
    @Max(82)
    Integer avatar,

    @Size(min = 0, max = 6)
    String code,

    @Min(10)
    @Max(300)
    Integer timeToAnswer,

    @Min(10)
    @Max(300)
    Integer timeToDraw,

    @Min(0)
    @Max(1)
    Integer mode
) {
}
