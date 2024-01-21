package dev.gitone.server.models.git;

import org.apache.logging.log4j.util.Strings;
import org.eclipse.jgit.lib.Constants;

public class Util {

    private static boolean isHex(char c) {
        return ('0' <= c && c <= '9')
                || ('a' <= c && c <= 'f')
                || ('A' <= c && c <= 'F');
    }

    public static boolean isObjectId(String ref) {
        if (Strings.isBlank(ref)) return false;

        if (ref.length() != Constants.OBJECT_ID_STRING_LENGTH)
            return false;

        for (int i = 0; i < Constants.OBJECT_ID_STRING_LENGTH; i++) {
            if (!isHex(ref.charAt(i)))
                return false;
        }

        return true;
    }

    public static String filename(String path) {
        int idx = path.lastIndexOf('/');
        return path.substring(idx+1);
    }

    public static String join(String path, String name) {
        if (path.isEmpty())
            return name;
        return String.join("/", path, name);
    }
}
