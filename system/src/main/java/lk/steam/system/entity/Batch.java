package lk.steam.system.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

    private String batchcode varchar(45)
    private String commencedate date
    private String enddate date
    private String seatcount int
    private String starttime time
    private String endtime time
    private String createdby varchar(45)
    private String lecturer varchar(45)
    private String status int
    private String timestamp datetime
    private String location varchar(45)
    private String description varchar(255)
    private String course_id int
}
