package lk.steam.system;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface inquiryDAO extends JpaRepository<inquiry,Integer> {

    @Query(value = "SELECT * FROM inquiry WHERE inquirystatus_id =1 OR inquirystatus_id=2",nativeQuery = true)
    List<inquiry> findActiveInquiry();

    @Query(value = "SELECT * FROM inquiry WHERE inquiryStatus_id=3",nativeQuery = true)
    List<inquiry> findRegisteredInquiry();

    @Query(value = "SELECT * FROM inquiry WHERE inquiryStatus_id=4",nativeQuery = true)
    List<inquiry> findDroppedInquiry();

    @Query(value = "SELECT * FROM inquiry WHERE inquiry.inquirystatus_id =1;",nativeQuery = true)
    List<inquiry> findNewInquiry();

    @Query(value="SELECT DISTINCT i.id, i.source_id, i.course_id, i.firstname, i.lastname, i.primarymobilenumber, i.secondarymobilenumber, i.email, i.idtype, i.idvalue, i.contacttime, i.description,i.addedby,i.timestamp, i.inquirystatus_id, f.type, f.feeling, f.confirmed, f.content, f.nextfollowup AS followuptime FROM inquiry i LEFT JOIN followup f ON i.id = f.inquiry_id\n" +
            "WHERE f.followuptime = (SELECT MAX(followuptime) FROM followup WHERE followup.inquiry_id = i.id) ORDER BY i.id;",nativeQuery = true)
    List<inquiry> test();

}

