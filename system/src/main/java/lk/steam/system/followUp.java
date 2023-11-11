package lk.steam.system;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "followup")

@Data
@AllArgsConstructor
@NoArgsConstructor
public class followUp {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "type")
    @NotNull
    private String type;

    @Column(name = "feeling")
    @NotNull
    private String feeling;

    @Column(name = "confirmed")
    @NotNull
    private String confirmed;

    @Column(name = "content")
    @NotNull
    private String content;

    @Column(name = "contacttime")
    @NotNull
    private LocalDateTime contactTime;

    @Column(name = "addedby")
    @NotNull
    private String addedBy;

    @Column(name = "followuptime")
    @NotNull
    private LocalDateTime followUpTime;

    //foreign key
    @ManyToOne
    @JoinColumn(name = "inquiry_id",referencedColumnName = "id")
    private inquiry inquiryId;


}
