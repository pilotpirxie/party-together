package com.pilotpirxie.party.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "answers_history")
@IdClass(AnswersHistoryId.class)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnswersHistoryEntity {
    @Id
    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Id
    @Column(name = "game_id", nullable = false)
    private UUID gameId;

    @Id
    @Column(name = "question_id", nullable = false)
    private UUID questionId;

    @ManyToOne
    @JoinColumn(name = "answer_id")
    private AnswerEntity answer;

    @ManyToOne
    @JoinColumn(name = "game_id")
    private GameEntity game;

    @Column()
    private String answerUrl;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
