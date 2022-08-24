package br.edu.utfpr.pb.pw25s.server;

import br.edu.utfpr.pb.pw25s.server.model.User;
import br.edu.utfpr.pb.pw25s.server.repository.UserRepository;
import br.edu.utfpr.pb.pw25s.server.utils.GenericResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class UserControllerTest {

    @Autowired
    TestRestTemplate testRestTemplate;
    @Autowired
    UserRepository userRepository;

    @BeforeEach()
    private void cleanup() {
        userRepository.deleteAll();
        testRestTemplate.getRestTemplate().getInterceptors().clear();
    }

    // methodName_condition_expectedBehaviour
    @Test
    public void postUser_whenUserIsValid_receiveOk() {
        User user = new User();
        user.setUsername("test-user");
        user.setDisplayName("test-dislpay");
        user.setPassword("P4ssword");

        ResponseEntity<Object> response =
                testRestTemplate.postForEntity("/users", user, Object.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void postUser_whenUserIsValid_userSavedToDatabase() {
        User user = new User();
        user.setUsername("test-user");
        user.setDisplayName("test-dislpay");
        user.setPassword("P4ssword");

        ResponseEntity<Object> response =
                testRestTemplate.postForEntity("/users", user, Object.class);
        assertThat( userRepository.count() ).isEqualTo(1);
    }

    @Test
    public void postUser_whenUserIsValid_receiveSuccessMessage() {
        User user = new User();
        user.setUsername("test-user");
        user.setDisplayName("test-dislpay");
        user.setPassword("P4ssword");

        ResponseEntity<GenericResponse> response =
                testRestTemplate.postForEntity("/users", user, GenericResponse.class);
        assertThat( response.getBody().getMessage() ).isNotNull();
    }


}
