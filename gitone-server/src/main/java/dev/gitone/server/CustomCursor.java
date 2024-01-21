package dev.gitone.server;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import graphql.relay.ConnectionCursor;

import java.io.IOException;
import java.util.Base64;

public class CustomCursor implements ConnectionCursor {

    protected static final ObjectMapper mapper = new ObjectMapper();

    protected static final Base64.Decoder decoder= Base64.getUrlDecoder();

    protected static final Base64.Encoder encoder = Base64.getUrlEncoder();

    static {
        mapper.findAndRegisterModules();
    }

    public static <T> T create(String text, TypeReference<T> valueTypeRef) {
        try {
            return mapper.readValue(decoder.decode(text), valueTypeRef);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @JsonIgnore
    private String value;

    @Override
    public String getValue() {
        if (value == null) {
            try {
                this.value = encoder.encodeToString(mapper.writeValueAsBytes(this));
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
        }
        return value;
    }

    @Override
    public String toString() {
        return getValue();
    }
}
