package cn.notfound.gitone.server.services;

import cn.notfound.gitone.server.config.CustomProperties;
import cn.notfound.gitone.server.controllers.avatars.AvatarController;
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
public class AvatarService extends BaseService {

    private static final int MB = 1024 * 1024;

    private static final String BLANK_AVATAR = "static/images/avatar.jpeg";

    private CustomProperties properties;

    public Resource find(Integer userId) {
        File avatarFile = properties.getUserAvatar(userId).toFile();
        if (avatarFile.exists()) {
            return new FileSystemResource(avatarFile);
        }

        URL url = AvatarController.class.getClassLoader().getResource(BLANK_AVATAR);
        Assert.notNull(url, "头像不存在");
        return new UrlResource(url);
    }

    public String create(MultipartFile multipartFile) throws IOException {
        Assert.notNull(multipartFile, "上传文件出错");
        Assert.isTrue(multipartFile.getSize() <= 2 * MB, "文件大小超出 2MB");

        File tempFile = File.createTempFile("avatar-u-", ".unknown");
        try {
            multipartFile.transferTo(tempFile);
            validateExtension(tempFile, multipartFile.getContentType());
            transferToFile(tempFile);
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

    private void transferToFile(File tempFile) throws IOException {
        File outFile = properties.getUserAvatar(viewerId()).toFile();
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
