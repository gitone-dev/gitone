package cn.notfound.gitone.server.controllers.emails;

import cn.notfound.gitone.server.daos.EmailDao;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@AllArgsConstructor
@Controller
public class EmailQueryController {
    private EmailDao emailDao;

    @QueryMapping
    public Boolean existEmail(@Argument String email) {
        return emailDao.findByEmail(email) != null;
    }
}
