package br.edu.utfpr.pb.pw25s.server.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Data
@Entity(name = "tb_user")
public class User {

    @Id
    @GeneratedValue
    private long id;

    private String username;

    private String displayName;

    private String password;

}
