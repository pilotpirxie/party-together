package com.pilotpirxie.party.dto.events.outgoing;

import com.pilotpirxie.party.dto.*;

import java.util.List;

public record JoinedEvent(
    GameDto game,
    List<QuestionDto> questions,
    List<CategoryDto> categories,
    List<UserDto> users,
    UserDto currentUser,
    List<AnswerHistoryDto> answers
) {
}
