package lk.steam.system;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface followUpDAO extends JpaRepository<followUp,Integer> {

    //Display all the inquiries with the latest follow-up information
    //This data will be shown in crm-> Inquiries
    @Query(value = "SELECT f.* FROM followup f JOIN (SELECT inquiry_id, MAX(followuptime) AS max_followuptime FROM followup GROUP BY inquiry_id) max_followup ON f.inquiry_id = max_followup.inquiry_id AND f.followuptime = max_followup.max_followuptime;",nativeQuery = true)
    List<followUp> latestFollowupForEachInquiry();

}
