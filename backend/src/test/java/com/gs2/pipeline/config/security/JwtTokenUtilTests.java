package com.gs2.pipeline.config.security;

import com.gs2.pipeline.config.security.jwt.JwtTokenUtil;
import org.assertj.core.util.DateUtil;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
public class JwtTokenUtilTests {

    private JwtTokenUtil jwtTokenUtil;

    @Before
    public void setup() {

        jwtTokenUtil = new JwtTokenUtil();
        ReflectionTestUtils.setField(jwtTokenUtil, "expirationSeconds", 3600000L);
        ReflectionTestUtils.setField(jwtTokenUtil, "secret", "mySecret");
    }

    @Test
    public void generateToken_shouldGeneratesDifferentTokensForDifferentCreationDates() throws Exception {

        final Map<String, Object> claims = createClaims("2016-09-08T03:00:00");
        final String token = jwtTokenUtil.generateToken(claims);

        final Map<String, Object> claimsForLaterToken = createClaims("2016-09-08T08:00:00");
        final String laterToken = jwtTokenUtil.generateToken(claimsForLaterToken);

        assertThat(token).isNotEqualTo(laterToken);
    }

    private Map<String, Object> createClaims(String creationDate) {

        Map<String, Object> claims = new HashMap();
        claims.put(JwtTokenUtil.CLAIM_KEY_USERNAME, "testUser");
        claims.put(JwtTokenUtil.CLAIM_KEY_AUDIENCE, "testAudience");
        claims.put(JwtTokenUtil.CLAIM_KEY_CREATED, DateUtil.parseDatetime(creationDate));
        return claims;
    }
}
