package cn.notfound.gitone.server.daos;

import cn.notfound.gitone.server.entities.UserDetailEntity;
import cn.notfound.gitone.server.mappers.UserDetailMapper;
import org.springframework.stereotype.Repository;

@Repository
public class UserDetailDao extends NodeDao<Integer, UserDetailEntity, UserDetailMapper> {

    public UserDetailDao(UserDetailMapper mapper) {
        super(mapper);
    }
}
