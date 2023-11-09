package lk.steam.system;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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

    @Column(name = "firstname",length = 20)
    @NotNull
    private String firstName;

    @Column(name = "lastname",length = 30)
    @NotNull
    private String lastName;

    @Column(name = "primarymobilenumber")
    @NotNull
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
