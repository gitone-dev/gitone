package cn.notfound.gitone.server.mailers;

import cn.notfound.gitone.server.config.CustomProperties;
import cn.notfound.gitone.server.jobs.UserMailJob;
import cn.notfound.gitone.server.mailers.types.ActivateUserUserModel;
import cn.notfound.gitone.server.mailers.types.ResetPasswordModel;
import freemarker.template.Configuration;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.StringWriter;

@AllArgsConstructor
@Service
public class UserMailSender {

    private JavaMailSender mailSender;

    private Configuration configuration;

    private CustomProperties customProperties;

    public void createUser(String email, String emailToken) throws Exception {
        StringWriter stringWriter = new StringWriter();
        ActivateUserUserModel model = new ActivateUserUserModel();
        model.setSiteName(customProperties.getSiteName());
        model.setBaseUrl(customProperties.getBaseUrl());
        model.setToken(emailToken);
        configuration.getTemplate("mail/createUser.ftlh").process(model, stringWriter);

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setSubject(model.getSubject());
        helper.setTo(email);
        helper.setText(stringWriter.toString(), true);
        mailSender.send(message);
    }

    public void resetPassword(String email, String emailToken) throws Exception {
        StringWriter stringWriter = new StringWriter();
        ResetPasswordModel model = new ResetPasswordModel();
        model.setSiteName(customProperties.getSiteName());
        model.setBaseUrl(customProperties.getBaseUrl());
        model.setToken(emailToken);
        configuration.getTemplate("mail/resetPassword.ftlh").process(model, stringWriter);

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setSubject(model.getSubject());
        helper.setTo(email);
        helper.setText(stringWriter.toString(), true);
        mailSender.send(message);
    }
}
