package lk.steam.system.dao;

import lk.steam.system.entity.Inquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface InquiryDAO extends JpaRepository<Inquiry,Integer> {

    //display all the active inquiries (New and Processing)
    //without any follow-ups
    @Query(value = "SELECT * FROM inquiry WHERE inquirystatus_id =1 OR inquirystatus_id=2",nativeQuery = true)
    List<Inquiry> findActiveInquiry();

    //display all the Registered Inquiries
    //This data will be shown in crm-> Reports-> Registered
    @Query(value = "SELECT * FROM inquiry WHERE inquiryStatus_id=3",nativeQuery = true)
    List<Inquiry> findRegisteredInquiry();

    //display all the Dropped Inquiries
    //This data will be shown in crm-> Reports-> Dropped
    @Query(value = "SELECT * FROM inquiry WHERE inquiryStatus_id=4",nativeQuery = true)
    List<Inquiry> findDroppedInquiry();

    //display all the New Inquiries
    //This data will be shown in crm-> Dashboard-> inquiry pool
    @Query(value = "SELECT * FROM inquiry WHERE inquiry.inquirystatus_id =1;",nativeQuery = true)
    List<Inquiry> findNewInquiry();

    //Display all the inquiries with the latest follow-up information
    //This data will be shown in crm-> Inquiries
    @Query(value="SELECT DISTINCT i.id, i.source_id, i.course_id, i.firstname, i.lastname, i.primarymobilenumber, i.secondarymobilenumber, i.email, i.idtype, i.idvalue, i.contacttime, i.description,i.addedby,i.timestamp, i.inquirystatus_id, f.type, f.feeling, f.confirmed, f.content, f.nextfollowup AS followuptime FROM inquiry i LEFT JOIN followup f ON i.id = f.inquiry_id\n" +
            "WHERE f.followuptime = (SELECT MAX(followuptime) FROM followup WHERE followup.inquiry_id = i.id) ORDER BY i.id;",nativeQuery = true)
    List<Map<String,Object>> test();

    //Display all the inquires with follow-up data
    //This data will be shown in crm-> Dashboard-> schedule pool
    @Query(value = "SELECT * FROM steam.inquiry JOIN ( SELECT * FROM steam.followup  WHERE DATE(nextfollowup) = CURDATE()) AS followup ON inquiry.id = followup.inquiry_id;",nativeQuery = true)
    List<Map<String,Object>> test2();

    //Get the next inquiry number form the database
    //This data will be used in InquiryController
    @Query(value = "SELECT LPAD(MAX(inq.inquirynumber) + 1, 6, 0) AS inquirynumber FROM inquiry AS inq;",nativeQuery = true)
    String getNextInquiryNumber();

}

