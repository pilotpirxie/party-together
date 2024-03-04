package com.pilotpirxie.party.dto.events.outgoing;

import com.pilotpirxie.party.dto.CategoryDto;
import com.pilotpirxie.party.dto.GameDto;
import com.pilotpirxie.party.dto.QuestionDto;
import com.pilotpirxie.party.dto.UserDto;

import java.util.List;

public record JoinedEvent(
    GameDto game,
    List<QuestionDto> questions,
    List<CategoryDto> categories,
    List<UserDto> users,
    UserDto currentUser
) {
}
