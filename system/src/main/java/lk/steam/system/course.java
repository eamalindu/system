package lk.steam.system;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "course")
@Data

public class course {
    @Id
    @Column(name = "id",unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name; //100

    private String code; //5 unique

    private String minimumRequirment; //45

    private Integer duration;

}
