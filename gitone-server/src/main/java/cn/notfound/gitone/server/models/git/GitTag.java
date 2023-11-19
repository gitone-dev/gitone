package cn.notfound.gitone.server.models.git;

import cn.notfound.gitone.server.OrderDirection;
import cn.notfound.gitone.server.config.exception.NotFound;
import cn.notfound.gitone.server.controllers.branches.BranchOrderField;
import cn.notfound.gitone.server.controllers.tags.TagFilter;
import cn.notfound.gitone.server.controllers.tags.TagOrderField;
import cn.notfound.gitone.server.controllers.tags.TagPage;
import org.apache.logging.log4j.util.Strings;
import org.eclipse.jgit.lib.*;
import org.eclipse.jgit.revwalk.RevCommit;
import org.eclipse.jgit.revwalk.RevObject;
import org.eclipse.jgit.revwalk.RevTag;
import org.eclipse.jgit.revwalk.RevWalk;
import org.springframework.util.Assert;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

public class GitTag extends GitRef {

    public static final String TYPE = "Tag";

    private final RevTag revTag; // FIXME: 2023/11/2

    public GitTag(GitRepository gitRepository, Ref ref, RevTag revTag, RevCommit revCommit) {
        super(gitRepository, ref, revCommit);
        this.revTag = revTag;
    }

    public String getName() {
        return getFullName().substring(Constants.R_TAGS.length());
    }

    public GitUser getTagger() {
        if (revTag.getTaggerIdent() == null) return null;
        return new GitUser(revTag.getTaggerIdent());
    }

    public String getShortMessage() {
        return revTag.getShortMessage();
    }

    public String getFullMessage() {
        return revTag.getFullMessage();
    }

    // FIXME: 2023/11/3 时间相同
    private static final Map<TagOrderField, Map<OrderDirection, Comparator<GitTag>>> sort = Map.of(
            TagOrderField.NAME, Map.of(
                    OrderDirection.ASC, Comparator.comparing(GitTag::getName),
                    OrderDirection.DESC, (b1, b2) -> b2.getName().compareTo(b1.getName())),
            TagOrderField.AUTHOR_DATE, Map.of(
                    OrderDirection.ASC, Comparator.comparing(b -> b.getCommit().getAuthor().getDate()),
                    OrderDirection.DESC, (b1, b2) -> b2.getCommit().getAuthor().getDate().compareTo(b1.getCommit().getAuthor().getDate())),
            TagOrderField.COMMITTER_DATE, Map.of(
                    OrderDirection.ASC, Comparator.comparing(b -> b.getCommit().getCommitter().getDate()),
                    OrderDirection.DESC, (b1, b2) -> b2.getCommit().getCommitter().getDate().compareTo(b1.getCommit().getCommitter().getDate()))
    );

    public static GitTag create(GitRepository gitRepository, GitUser user, String name, String revision, String message) throws IOException {
        Repository repository = gitRepository.repository;

        GitCommit gitCommit = GitCommit.find(gitRepository, revision);
        NotFound.notNull(gitCommit, revision);

        TagBuilder newTag = new TagBuilder();
        newTag.setTag(name);
        newTag.setObjectId(gitCommit.revCommit);
        if (!Strings.isBlank(message)) {
            newTag.setMessage(message);
            newTag.setTagger(user.getPersonIdent());
        }
        try (ObjectInserter inserter = repository.newObjectInserter()) {
            ObjectId tagId = inserter.insert(newTag);
            inserter.flush();

            String tagName = newTag.getTag();
            RefUpdate tagRef = repository.updateRef(Constants.R_TAGS + tagName);
            tagRef.setNewObjectId(tagId);
            tagRef.setRefLogMessage("tagged " + tagName, false);
            RefUpdate.Result updateResult = tagRef.update();
            Assert.isTrue(updateResult== RefUpdate.Result.NEW, "创建失败");
            return GitTag.find(gitRepository, name);
        }
    }

    public static GitTag find(GitRepository gitRepository, String name) throws IOException {
        Repository repository = gitRepository.repository;
        Ref ref = repository.getRefDatabase().exactRef(Constants.R_TAGS + name);
        if (ref == null) return null;

        try (RevWalk walk = new RevWalk(repository)) {
            RevObject revObject = walk.parseAny(ref.getObjectId());
            RevTag revTag = null;
            RevCommit revCommit;
            switch (revObject.getType()) {
                case Constants.OBJ_TAG -> {
                    revTag = walk.parseTag(revObject);
                    revObject =  walk.peel(revTag.getObject());
                    if (revObject.getType() != Constants.OBJ_COMMIT) return null;
                    revCommit = walk.parseCommit(revObject);
                }
                case Constants.OBJ_COMMIT -> revCommit = walk.parseCommit(revObject);
                default ->
                        throw new RuntimeException("invalid revObject type");
            }

            return new GitTag(gitRepository, ref, revTag, revCommit);
        }
    }

    public static List<GitTag> findAll(GitRepository gitRepository, TagFilter filterBy, TagPage page) throws IOException {
        List<GitTag> tags = new ArrayList<>();

        Repository repository = gitRepository.repository;
        List<Ref> refs = repository.getRefDatabase().getRefsByPrefix(Constants.R_TAGS);
        try (RevWalk walk = new RevWalk(repository)) {
            for (Ref ref : refs) {
                if (filterBy.getQuery() != null && !ref.getName().contains(filterBy.getQuery())) continue;

                RevObject revObject = walk.parseAny(ref.getObjectId());
                RevTag revTag = null;
                RevCommit revCommit;
                switch (revObject.getType()) {
                    case Constants.OBJ_TAG -> {
                        revTag = walk.parseTag(revObject);
                        revObject =  walk.peel(revTag.getObject());
                        if (revObject.getType() != Constants.OBJ_COMMIT) continue;
                        revCommit = walk.parseCommit(revObject);
                    }
                    case Constants.OBJ_COMMIT -> revCommit = walk.parseCommit(revObject);
                    default ->
                            throw new RuntimeException("invalid revObject type");
                }

                GitTag gitTag = new GitTag(gitRepository, ref, revTag, revCommit);
                if (!page.isBetween(gitTag)) continue;

                tags.add(gitTag);
            }
        }
        tags.sort(sort.get(page.getOrder().getField()).get(page.getOrder().getDirection()));

        if (page.getFirst() != null) {
            return tags.subList(0, Math.min(page.getFirst() + 1, tags.size()));
        } else {
            return tags.subList(Math.max(0, tags.size() - page.getLast() - 1), tags.size());
        }
    }

    public static void delete(GitRepository gitRepository, GitTag tag) throws IOException {
        Repository repository = gitRepository.repository;

        RefUpdate update = repository.updateRef(tag.getFullName());
        update.setForceUpdate(true);
        RefUpdate.Result result = update.delete();
        Assert.isTrue(result != RefUpdate.Result.REJECTED, "删除失败");
    }
}
