package org.login.app.server.profile;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;
import org.login.app.server.account.User;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "preferences", schema = "profile")
public class Preference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private boolean newsletter;
    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}
