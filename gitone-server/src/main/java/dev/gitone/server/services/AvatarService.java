package dev.gitone.server.services;

import dev.gitone.server.ViewerContext;
import dev.gitone.server.config.CustomProperties;
import dev.gitone.server.controllers.avatars.AvatarController;
import dev.gitone.server.daos.NamespaceDao;
import dev.gitone.server.daos.OAuth2RegisteredClientDao;
import dev.gitone.server.entities.NamespaceEntity;
import dev.gitone.server.entities.OAuth2RegisteredClientEntity;
import dev.gitone.server.policies.Action;
import dev.gitone.server.policies.NamespacePolicy;
import lombok.AllArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.imageio.ImageReader;
import javax.imageio.stream.ImageInputStream;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.net.URL;
import java.util.Iterator;

@AllArgsConstructor
@Service
public class AvatarService extends ViewerContext {

    public enum Type {
        N, // namespace
        A  // application
    }

    private static final int MB = 1024 * 1024;

    private static final String BLANK_AVATAR = "static/images/avatar.jpeg";

    private CustomProperties properties;

    private NamespaceDao namespaceDao;

    private NamespacePolicy namespacePolicy;

    private OAuth2RegisteredClientDao registeredClientDao;

    public Resource find(Type type, Integer id) {
        File avatarFile = properties.findAvatar(type, id).toFile();
        if (avatarFile.exists()) {
            return new FileSystemResource(avatarFile);
        }

        URL url = AvatarController.class.getClassLoader().getResource(BLANK_AVATAR);
        Assert.notNull(url, "图片不存在");
        return new UrlResource(url);
    }

    public String create(Type type, Integer id, MultipartFile multipartFile) throws IOException {
        Assert.notNull(multipartFile, "上传文件出错");
        Assert.isTrue(multipartFile.getSize() <= 2 * MB, "文件大小超出 2MB");
        NamespaceEntity namespaceEntity = null;

        switch (type) {
            case N -> namespaceEntity = namespaceDao.find(id);
            case A -> {
                OAuth2RegisteredClientEntity registeredClientEntity = registeredClientDao.find(id);
                Assert.notNull(registeredClientEntity, "不存在");
                namespaceEntity = namespaceDao.find(registeredClientEntity.getNamespaceId());
            }
        }
        namespacePolicy.assertPermission(namespaceEntity, Action.UPDATE);

        File tempFile = File.createTempFile("avatar-", ".unknown");
        try {
            multipartFile.transferTo(tempFile);
            validateExtension(tempFile, multipartFile.getContentType());
            transferToFile(type, id, tempFile);
        } finally {
            tempFile.delete();
        }

        return "ok";
    }

    private void validateExtension(File imageFile, String contentType) throws IOException {
        String extension;
        if (MediaType.IMAGE_PNG_VALUE.equals(contentType)) {
            extension = MediaType.IMAGE_PNG.getSubtype();
        } else if (MediaType.IMAGE_JPEG_VALUE.equals(contentType)) {
            extension = MediaType.IMAGE_JPEG.getSubtype();
        } else {
            throw new IllegalArgumentException("文件格式不支持");
        }

        try (ImageInputStream iis = ImageIO.createImageInputStream(imageFile)) {
            Iterator<ImageReader> imageReaders = ImageIO.getImageReaders(iis);
            Assert.isTrue(imageReaders.hasNext(), "文件格式不支持");
            ImageReader imageReader = imageReaders.next();
            boolean result = imageReader.getFormatName().equalsIgnoreCase(extension);
            Assert.isTrue(result, "文件格式不支持");
        }
    }

    private void transferToFile(Type type, Integer id, File tempFile) throws IOException {
        File outFile = properties.findAvatar(type, id).toFile();
        File parentFile = outFile.getParentFile();
        Assert.isTrue(parentFile.exists() || parentFile.mkdirs(), "创建目录失败");

        InputStream in = new FileInputStream(tempFile);
        BufferedImage inImage = ImageIO.read(in);
        in.close();

        double n = inImage.getWidth() / 400.0;
        int width = (int) (inImage.getWidth() / n);
        int height = (int) (inImage.getHeight() / n);

        BufferedImage outImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
        outImage.createGraphics().drawImage(inImage, 0, 0, width, height, Color.WHITE, null);

        try(OutputStream out = new FileOutputStream(outFile)) {
            boolean result = ImageIO.write(outImage, MediaType.IMAGE_JPEG.getSubtype(), out);
            Assert.isTrue(result, "添加头像失败");
        }
    }
}
