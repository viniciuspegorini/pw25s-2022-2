package br.edu.utfpr.pb.pw25s.server.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class CategoryDto {

    private Long id;

    @NotNull
    @Size(min = 2, max = 50)
    private String name;

}
