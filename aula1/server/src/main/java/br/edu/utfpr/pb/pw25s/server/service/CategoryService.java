package br.edu.utfpr.pb.pw25s.server.service;

import br.edu.utfpr.pb.pw25s.server.model.Category;

public interface CategoryService {

    Category save(Category category);

    Category findOne(Long id);
}
