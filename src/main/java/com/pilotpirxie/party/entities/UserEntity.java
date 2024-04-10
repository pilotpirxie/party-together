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
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@BatchSize(size = 50)
public class UserEntity {
    @Id
    @GeneratedValue
    @Column()
    private UUID id;

    @Column(nullable = false)
    private String sessionId;

    @Column(name = "game_id", nullable = false)
    private UUID gameId;

    @Column( nullable = false)
    private String nickname;

    @Column(nullable = false)
    private Integer avatar;

    @Column(nullable = false)
    private String color;

    @Column(nullable = false)
    private boolean isReady;

    @Column(nullable = false)
    private boolean isTv;

    @Column(nullable = false)
    private boolean connected;

    @CreationTimestamp
    @Column(nullable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;
}