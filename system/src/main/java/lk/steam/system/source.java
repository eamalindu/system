package lk.steam.system;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "source")
@Data
public class source {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

}
