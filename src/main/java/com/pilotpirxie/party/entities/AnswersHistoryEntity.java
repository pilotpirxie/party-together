package com.pilotpirxie.party.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "answers_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@BatchSize(size = 50)
public class AnswersHistoryEntity {
    @Id
    @GeneratedValue
    @Column()
    private UUID id;

    @Column(name = "game_id", nullable = false)
    private UUID gameId;

    @Column(name = "question_id", nullable = false)
    private UUID questionId;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "answer_id")
    private UUID answerId;

    @Column(name = "selected_user_id")
    private UUID selectedUserId;

    @Column(name = "drawing")
    private String drawing;

    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}
