package lk.steam.system.dao;

import lk.steam.system.entity.Designation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DesignationDAO extends JpaRepository<Designation,Integer> {
}
