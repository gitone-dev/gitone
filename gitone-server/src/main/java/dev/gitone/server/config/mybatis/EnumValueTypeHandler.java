package dev.gitone.server.config.mybatis;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.springframework.util.Assert;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class EnumValueTypeHandler<E extends Enum<E> & IntegerValue> extends BaseTypeHandler<E> {

    private final Class<E> type;

    private final E[] enums;

    public EnumValueTypeHandler(Class<E> type) {
        this.type = type;
        this.enums = type.getEnumConstants();
        Assert.notNull(this.type, "Type argument cannot be null");
        Assert.notNull(this.enums, type.getSimpleName() + " does not represent an enum type.");
    }

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, E parameter, JdbcType jdbcType) throws SQLException {
        ps.setInt(i, parameter.value());
    }

    @Override
    public E getNullableResult(ResultSet rs, String columnName) throws SQLException {
        int value = rs.getInt(columnName);
        if (value == 0 && rs.wasNull()) {
            return null;
        }
        return toValueEnum(value);
    }

    @Override
    public E getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        int value = rs.getInt(columnIndex);
        if (value == 0 && rs.wasNull()) {
            return null;
        }
        return toValueEnum(value);
    }

    @Override
    public E getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        int value = cs.getInt(columnIndex);
        if (value == 0 && cs.wasNull()) {
            return null;
        }
        return toValueEnum(value);
    }

    private E toValueEnum(int value) {
        for (E e : enums) {
            if (e.value() == value) return e;
        }
        throw new IllegalArgumentException("Cannot convert " + value + " to " + type.getSimpleName() + " by value.");
    }
}
