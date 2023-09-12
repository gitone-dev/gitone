package cn.notfound.gitone.server.mappers;

import cn.notfound.gitone.server.controllers.members.MemberFilter;
import cn.notfound.gitone.server.controllers.members.MemberPage;
import cn.notfound.gitone.server.entities.MemberEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface MemberMapper extends NodeMapper<Integer, MemberEntity> {

    List<MemberEntity> findAll(@Param("filter") MemberFilter filter, @Param("page") MemberPage page);

    MemberEntity findByNamespaceIdAndUserId(
            @Param("namespaceId") Integer namespaceId,
            @Param("userId") Integer userId);

    int deleteByNamespaceId(Integer namespaceId);
}
