package br.edu.utfpr.pb.pw25s.server.service;

import br.edu.utfpr.pb.pw25s.server.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CategoryService {

    Category save(Category category);

    Category findOne(Long id);

    List<Category> findAll();

    Page<Category> findAll(Pageable pageable);

    Long count();

    Boolean exists(Long id);

    void delete(Long id);
}
