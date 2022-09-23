package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.dto.CategoryDto;
import br.edu.utfpr.pb.pw25s.server.model.Category;
import br.edu.utfpr.pb.pw25s.server.service.CategoryService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("categories")
public class CategoryController {

    private final CategoryService categoryService;
    private ModelMapper modelMapper;

    public CategoryController(CategoryService categoryService,
                              ModelMapper modelMapper) {
        this.categoryService = categoryService;
        this.modelMapper = modelMapper;
    }

    @PostMapping
    public ResponseEntity<CategoryDto> save(@RequestBody @Valid CategoryDto categoryDto) {
        Category category = categoryService.save(
                convertDtoToEntity(categoryDto));
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(category.getId()).toUri();

        return ResponseEntity.created(location).body(convertEntityToDto(category));
    }

    @GetMapping("{id}") // http://localhost:8080/categories/1
    public ResponseEntity<CategoryDto> findOne(@PathVariable Long id) {
        return ResponseEntity.ok(convertEntityToDto(categoryService.findOne(id)));
    }

    @GetMapping
    public ResponseEntity<List<CategoryDto>> findAll() {
        return ResponseEntity.ok(
                categoryService.findAll().stream()
                        .map(this::convertEntityToDto)
                        .collect(Collectors.toList())
        );
    }

    @GetMapping("page")
    public ResponseEntity<Page<CategoryDto>> findAllPaged(@RequestParam int page,
                                                          @RequestParam int size,
                                                          @RequestParam(required = false) String order,
                                                          @RequestParam(required = false) Boolean asc) {
        PageRequest pageRequest = PageRequest.of(page, size);
        if (order != null && asc != null) {
            pageRequest = PageRequest.of(page, size,
                    asc ? Sort.Direction.ASC : Sort.Direction.DESC, order);
        }
        return ResponseEntity.ok(
                categoryService.findAll(pageRequest).map(
                        this::convertEntityToDto) );

    }

    @PutMapping
    public ResponseEntity<CategoryDto> update(@RequestBody @Valid CategoryDto categoryDto) {
        Category category = categoryService.save(
                convertDtoToEntity(categoryDto));
        return ResponseEntity.ok(convertEntityToDto(category));
    }

    @GetMapping("count")
    public ResponseEntity<Long> count() {
        return ResponseEntity.ok( categoryService.count() );
    }

    @GetMapping("exists/{id}")
    public ResponseEntity<Boolean> exists(@PathVariable Long id) {
        return ResponseEntity.ok( categoryService.exists(id) );
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        categoryService.delete(id);
    }




    private Category convertDtoToEntity(CategoryDto categoryDto) {
        return modelMapper.map(categoryDto, Category.class);
    }

    private CategoryDto convertEntityToDto(Category category) {
        return modelMapper.map(category, CategoryDto.class);
    }

}
