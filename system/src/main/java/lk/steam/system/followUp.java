package lk.steam.system;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private String contactTime;
    private String addedBy;
    private String followUpTime;

    //foreign key


}
