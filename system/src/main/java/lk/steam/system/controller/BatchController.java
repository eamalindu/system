package lk.steam.system.controller;

import lk.steam.system.dao.BatchDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/batch")
public class BatchController {

    @Autowired
    private BatchDAO batchDAO;
}
