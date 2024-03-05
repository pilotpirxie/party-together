package com.pilotpirxie.party.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {
    @Id
    @GeneratedValue
    @Column()
    private UUID id;

    @Column(nullable = false)
    private String sessionId;

    @ManyToOne
    @JoinColumn(name = "game_id", nullable = false)
    private GameEntity game;

    @Column( nullable = false)
    private String nickname;

    @Column(nullable = false)
    private Integer avatar;

    @Column(nullable = false)
    private boolean isReady;

    @Column(nullable = false)
    private boolean connected;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;
}