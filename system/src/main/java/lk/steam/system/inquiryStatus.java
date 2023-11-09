package lk.steam.system;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "inquirystatus")
@Data
public class inquiryStatus {

    @Id
    @Column(name = "id",unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name",length = 45)
    private String name;

}
