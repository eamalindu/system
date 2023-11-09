package lk.steam.system;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "inquiry")
@Data
public class inquiry {

    @Id
    @Column(name = "id",unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String firstName;

    private String lastName;

    private Integer primaryMobileNumber;

    private Integer secondaryMobileNumber;

    private String email;

    private String idType;

    private String idValue;

    private String description;

    private String addedBy;

    private LocalDateTime timeStamp;

    //add foreign keys now

}
