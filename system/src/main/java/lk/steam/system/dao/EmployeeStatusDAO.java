package lk.steam.system.dao;

import lk.steam.system.entity.EmployeeStatus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeStatusDAO extends JpaRepository<EmployeeStatus,Integer> {
}
