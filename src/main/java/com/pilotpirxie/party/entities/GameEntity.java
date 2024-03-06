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
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "game")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@BatchSize(size = 50)
public class GameEntity {
    @Id
    @GeneratedValue
    @Column()
    private UUID id;

    @Column(nullable = false, unique = true)
    private String code;

    @Column(nullable = false)
    private Integer questionIndex;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GameState state;

    @Column()
    private LocalDateTime timerTo;

    @Column(nullable = false)
    private Integer timeToAnswer;

    @Column(nullable = false)
    private Integer timeToDraw;

    @Column(name = "game_question_ids", nullable = false)
    private List<UUID> gameQuestionIds;

    @Column(name = "game_category_ids", nullable = false)
    private List<UUID> gameCategoryIds;

    @Column(nullable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}