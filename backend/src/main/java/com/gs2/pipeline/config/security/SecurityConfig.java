package com.gs2.pipeline.config.security;

import com.gs2.pipeline.config.security.jwt.JwtAuthenticationEntryPoint;
import com.gs2.pipeline.config.security.jwt.JwtAuthenticationTokenFilter;
import com.gs2.pipeline.config.security.jwt.JwtTokenUtil;
import com.gs2.pipeline.config.security.jwt.JwtUserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtUserDetailsServiceImpl jwtUserDetailsService;
    private final JwtAuthenticationEntryPoint unauthorizedHandler;
    private final JwtTokenUtil jwtTokenUtil;

    @Autowired
    public SecurityConfig(JwtUserDetailsServiceImpl jwtUserDetailsService,
                          JwtAuthenticationEntryPoint unauthorizedHandler,
                          JwtTokenUtil jwtTokenUtil) {

        this.jwtUserDetailsService = jwtUserDetailsService;
        this.unauthorizedHandler = unauthorizedHandler;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }

    @Bean
    public JwtAuthenticationTokenFilter authenticationTokenFilterBean() throws Exception {

        return new JwtAuthenticationTokenFilter(jwtUserDetailsService, jwtTokenUtil);
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {

        httpSecurity
                .csrf().disable()
                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .antMatchers("/auth/**").permitAll()
                .antMatchers("/ideas/**").permitAll() //TODO Remove this line. Must be authed to view ideas
                .anyRequest().authenticated();

        httpSecurity
                .addFilterBefore(authenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class);

        httpSecurity.headers().cacheControl();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {

        auth.userDetailsService(jwtUserDetailsService).passwordEncoder(passwordEncoder());
    }
}
