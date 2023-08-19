package cn.notfound.gitone.server.controllers.namespaces;

import cn.notfound.gitone.server.config.exception.NotFoundException;
import cn.notfound.gitone.server.daos.NamespaceDao;
import cn.notfound.gitone.server.entities.NamespaceEntity;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@AllArgsConstructor
@Controller
public class NamespaceQueryController {

    private NamespaceDao namespaceDao;

    @QueryMapping
    public Boolean existFullPath(@Argument String fullPath) {
        return namespaceDao.findByFullPath(fullPath) != null;
    }

    @QueryMapping
    public NamespaceEntity namespace(@Argument String fullPath) {
        NamespaceEntity namespaceEntity = namespaceDao.findByFullPath(fullPath);
        if (namespaceEntity == null) {
            throw new NotFoundException(fullPath);
        }
        return namespaceEntity;
    }
}
