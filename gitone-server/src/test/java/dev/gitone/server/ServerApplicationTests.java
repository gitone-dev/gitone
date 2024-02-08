package dev.gitone.server;

import dev.gitone.server.daos.OAuth2RegisteredClientDao;
import dev.gitone.server.entities.OAuth2RegisteredClientEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureHttpGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;

import java.util.UUID;

@AutoConfigureHttpGraphQlTester
@SpringBootTest
class ServerApplicationTests {

	@Autowired
	private OAuth2RegisteredClientDao registeredClientDao;

	@Test
	void contextLoads() {
		// String uuid = UUID.randomUUID().toString();
		// RegisteredClient registeredClient = RegisteredClient.withId(uuid)
		// 		.clientId(uuid)
		// 		.clientSecret("{noop}secret")
		// 		.clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
		// 		.authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
		// 		.authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
		// 		.authorizationGrantType(AuthorizationGrantType.CLIENT_CREDENTIALS)
		// 		.redirectUri("https://jenkins.k8s.test")
		// 		.scope("openid")
		// 		.build();

		OAuth2RegisteredClientEntity entity = registeredClientDao.find(1);
		entity.setRedirectUris(new String[]{"https://jenkins.k8s.test/securityRealm/finishLogin"});
		entity.setScopes(new String[]{"openid"});
		entity.setClientAuthenticationMethods( new String[]{
				ClientAuthenticationMethod.CLIENT_SECRET_BASIC.getValue(),
				ClientAuthenticationMethod.CLIENT_SECRET_POST.getValue(),
				ClientAuthenticationMethod.CLIENT_SECRET_JWT.getValue(),
				ClientAuthenticationMethod.PRIVATE_KEY_JWT.getValue()
		});
		registeredClientDao.update(entity);
	}

}
