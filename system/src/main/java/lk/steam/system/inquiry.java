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

    @Column(name = "secondarymobilenumber")
    private Integer secondaryMobileNumber;

    @Column(name = "email")
    private String email;

    @Column(name = "idtype",length = 6)
    @NotNull
    private String idType;

    @Column(name = "idvalue",length = 15)
    @NotNull
    private String idValue;

    @Column(name = "description")
    @NotNull
    private String description;

    @Column(name = "addedby",length = 30)
    @NotNull
    private String addedBy;

    @Column(name = "timestamp")
    @NotNull
    private LocalDateTime timeStamp;

    @ManyToOne
    @JoinColumn(name = "source_id",referencedColumnName = "id")
    private source sourceid;

    @ManyToOne
    @JoinColumn(name = "inquirystatus_id",referencedColumnName = "id")
    private inquiryStatus inquiryStatusid;

    @ManyToOne
    @JoinColumn(name = "course_id",referencedColumnName = "id")
    private course courseId;

}
