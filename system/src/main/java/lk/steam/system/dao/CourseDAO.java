package lk.steam.system.dao;

import lk.steam.system.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseDAO extends JpaRepository<Course,Integer> {

}
