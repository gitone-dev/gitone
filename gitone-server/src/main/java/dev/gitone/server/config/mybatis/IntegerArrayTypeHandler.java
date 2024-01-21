package dev.gitone.server.config.mybatis;

import org.apache.ibatis.type.ArrayTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.apache.ibatis.type.MappedTypes;
import org.springframework.util.Assert;

@MappedTypes(Integer[].class)
@MappedJdbcTypes(JdbcType.ARRAY)
public class IntegerArrayTypeHandler extends ArrayTypeHandler {

    @Override
    protected String resolveTypeName(Class<?> type) {
        Assert.isTrue(type.equals(Integer.class), "not integer type");
        return super.resolveTypeName(type);
    }
}
