package cn.notfound.gitone.server.daos;

import cn.notfound.gitone.server.entities.UserNamespaceEntity;
import cn.notfound.gitone.server.mappers.UserNamespaceMapper;
import org.springframework.stereotype.Repository;

@Repository
public class UserNamespaceDao extends BaseDao<Integer, UserNamespaceEntity, UserNamespaceMapper> {

    public UserNamespaceDao(UserNamespaceMapper mapper) {
        super(mapper);
    }
}
