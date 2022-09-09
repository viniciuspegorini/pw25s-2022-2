package br.edu.utfpr.pb.pw25s.server.model;

import br.edu.utfpr.pb.pw25s.server.validation.UniqueUsername;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@Entity(name = "tb_user")
// @Table(uniqueConstraints = @UniqueConstraint(columnNames = "username"))
public class User {

    @Id
    @GeneratedValue
    private long id;

    @UniqueUsername
    @NotNull(message = "{br.edu.utfpr.pb.pw25s.username}")
    @Size(min = 4, max = 255)
    private String username;

    @NotNull
    private String displayName;

    @NotNull
    @Size(min = 6, max = 254)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$")
    private String password;

}
