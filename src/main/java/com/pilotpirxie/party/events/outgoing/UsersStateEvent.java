package com.pilotpirxie.party.events.outgoing;

import com.pilotpirxie.party.dto.UserDto;

import java.util.List;

public record UsersStateEvent(
    List<UserDto> users
) {
}
