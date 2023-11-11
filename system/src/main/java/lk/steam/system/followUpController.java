package lk.steam.system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/STEAM-CRM/followup")
public class followUpController {
    @Autowired
    private followUpDAO followUpDAO;

    @GetMapping(value = "/findall",produces = "application/json")
    public List<inquiry> findAll(){
        return inquiryDAO.findAll();
    }
}
