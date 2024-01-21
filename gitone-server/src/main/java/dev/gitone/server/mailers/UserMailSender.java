package dev.gitone.server.mailers;

import dev.gitone.server.config.CustomProperties;
import dev.gitone.server.mailers.types.ActivateUserUserModel;
import dev.gitone.server.mailers.types.CreateEmailModel;
import dev.gitone.server.mailers.types.ResetPasswordModel;
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

    public void createEmail(String email, String token) throws Exception {
        StringWriter stringWriter = new StringWriter();
        CreateEmailModel model = new CreateEmailModel();
        model.setSiteName(customProperties.getSiteName());
        model.setBaseUrl(customProperties.getBaseUrl());
        model.setToken(token);
        configuration.getTemplate("mail/createEmail.ftlh").process(model, stringWriter);

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setSubject(model.getSubject());
        helper.setTo(email);
        helper.setText(stringWriter.toString(), true);
        mailSender.send(message);
    }
}
