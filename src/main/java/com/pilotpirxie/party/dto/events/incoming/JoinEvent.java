package com.pilotpirxie.party.dto.events.incoming;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

public record JoinEvent(
    @Size(min = 1, max = 16)
    String nickname,

    @Size(min = 6, max = 6)
    String color,

    @Min(0)
    @Max(82)
    Integer avatar,

    @Size(min = 6, max = 6)
    String code
) {
}
