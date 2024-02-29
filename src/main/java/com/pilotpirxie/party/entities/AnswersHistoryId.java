package com.pilotpirxie.party.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnswersHistoryId implements Serializable {
    private UUID userId;
    private UUID gameId;
    private UUID questionId;
}