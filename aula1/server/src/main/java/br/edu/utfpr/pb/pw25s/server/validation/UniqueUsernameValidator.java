package br.edu.utfpr.pb.pw25s.server.validation;

import br.edu.utfpr.pb.pw25s.server.repository.UserRepository;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {

    UserRepository userRepository;

    public UniqueUsernameValidator(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean isValid(String username,
                           ConstraintValidatorContext constraintValidatorContext) {
        if (userRepository.findByUsername(username) == null) {
            return true;
        }
        return false;
    }
}
