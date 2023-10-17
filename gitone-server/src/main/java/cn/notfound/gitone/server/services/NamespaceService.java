package cn.notfound.gitone.server.services;

import cn.notfound.gitone.server.ViewerContext;
import cn.notfound.gitone.server.controllers.namespaces.NamespaceFilter;
import cn.notfound.gitone.server.controllers.namespaces.NamespaceOrder;
import cn.notfound.gitone.server.controllers.namespaces.NamespacePage;
import cn.notfound.gitone.server.controllers.namespaces.inputs.UpdatePathInput;
import cn.notfound.gitone.server.controllers.namespaces.inputs.UpdateVisibilityInput;
import cn.notfound.gitone.server.daos.NamespaceDao;
import cn.notfound.gitone.server.entities.NamespaceEntity;
import cn.notfound.gitone.server.entities.Visibility;
import cn.notfound.gitone.server.policies.Action;
import cn.notfound.gitone.server.policies.NamespacePolicy;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;

@AllArgsConstructor
@Service
public class NamespaceService extends ViewerContext {

    private final NamespaceDao namespaceDao;

    private final NamespacePolicy namespacePolicy;

    public NamespaceEntity updateVisibility(UpdateVisibilityInput input) {
        NamespaceEntity namespaceEntity = namespaceDao.findByFullPath(input.getFullPath());
        namespacePolicy.assertPermission(namespaceEntity, Action.UPDATE);
        Assert.isTrue(!namespaceEntity.isUser(), "用户命名空间无法转换");

        if (input.toPrivate(namespaceEntity)) {
            NamespaceFilter filter = new NamespaceFilter();
            filter.setParentId(namespaceEntity.getId());
            filter.setParentLevel(namespaceEntity.getTraversalIds().length);
            filter.setRecursive(false);
            filter.setVisibility(Visibility.PUBLIC);

            NamespacePage page = new NamespacePage(1, null, new NamespaceOrder()).validate();
            List<NamespaceEntity> namespaces = namespaceDao.findAll(filter, page);
            Assert.isTrue(namespaces.isEmpty(), "存在公开子命名空间，当前组织无法转换为私有");
        } else if (input.toPublic(namespaceEntity)) {
            if (namespaceEntity.getParentId() != 0) {
                NamespaceEntity parent = namespaceDao.find(namespaceEntity.getParentId());
                Assert.isTrue(parent.isPublic(), "上级命名空间私有，当前命名空间无法转换为公开");
            }
        } else {
            return namespaceEntity;
        }

        namespaceEntity.setVisibility(input.getVisibility());
        return namespaceDao.update(namespaceEntity);
    }

    public NamespaceEntity updatePath(UpdatePathInput input) {
        NamespaceEntity namespaceEntity = namespaceDao.findByFullPath(input.getFullPath());
        namespacePolicy.assertPermission(namespaceEntity, Action.UPDATE);

        String oldFullPath = namespaceEntity.getFullPath();

        namespaceEntity.setPath(input.getPath());
        if (namespaceEntity.getParentId() == 0) {
            namespaceEntity.setFullPath(input.getPath());
        } else {
            NamespaceEntity parent = namespaceDao.find(namespaceEntity.getParentId());
            namespaceEntity.setFullPath(String.join("/", parent.getFullPath(), namespaceEntity.getPath()));
        }
        return namespaceDao.updatePath(namespaceEntity, oldFullPath);
    }
}
