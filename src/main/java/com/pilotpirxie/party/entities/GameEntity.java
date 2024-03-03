package com.pilotpirxie.party.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "game")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GameEntity {
    @Id
    private UUID id;

    @Column(nullable = false)
    private String code;

    @Column(nullable = false)
    private Integer questionIndex;

    @Column(nullable = false)
    private LocalDateTime timerTo;

    @Column(nullable = false)
    private Integer timeToAnswer;

    @Column(nullable = false)
    private Integer timeToDraw;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "game")
    private Set<UserEntity> users;

    @Column(name = "game_question_ids")
    private List<UUID> gameQuestionIds;

    @OneToMany(mappedBy = "game")
    private Set<AnswersHistoryEntity> answerHistories;
}