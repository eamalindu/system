package lk.steam.system;

import jakarta.persistence.*;
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

    private String type;
    private String feeling;
    private String confirmed;
    private String content;
    private LocalDateTime contactTime;
    private String addedBy;
    private LocalDateTime followUpTime;

    //foreign key
    @ManyToOne
    @JoinColumn(name = "inquiry_id",referencedColumnName = "id")
    private inquiry inquiryId;


}
