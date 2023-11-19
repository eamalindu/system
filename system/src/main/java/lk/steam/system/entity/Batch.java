package lk.steam.system.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "batch")

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Batch {

    @Id
    @Column(name = "id",unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String batchcode;
    private LocalDate commencedate;
    private LocalDate enddate;
    private String seatcount;
    private LocalTime starttime;
    private LocalTime endtime;
    private String createdby;
    private String lecturer;
    private Integer status;
    private LocalDateTime timestamp;
    private String location;
    private String description;

    @ManyToOne
    @JoinColumn()
    private Course course_id;
}
