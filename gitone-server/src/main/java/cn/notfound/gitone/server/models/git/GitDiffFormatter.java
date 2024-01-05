package cn.notfound.gitone.server.models.git;

import lombok.Getter;
import org.eclipse.jgit.diff.DiffFormatter;
import org.eclipse.jgit.diff.RawText;
import org.eclipse.jgit.patch.FileHeader;

import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

import static org.eclipse.jgit.lib.Constants.encodeASCII;

public class GitDiffFormatter extends DiffFormatter {

    @Getter
    private final List<GitDiffLine> diffLines;

    private int oldNumber;

    private int newNumber;

    @Getter
    private byte[] oldContent;

    @Getter
    private byte[] newContent;

    /**
     * Create a new formatter with a default level of context.
     *
     * @param out the stream the formatter will write line data to. This stream
     *            should have buffering arranged by the caller, as many small
     *            writes are performed to it.
     */
    public GitDiffFormatter(OutputStream out) {
        super(out);
        this.diffLines = new ArrayList<>();
    }

    public void format(FileHeader head, RawText a, RawText b)
            throws IOException {
        super.format(head, a, b);
        this.oldContent = a.getRawContent();
        this.newContent = b.getRawContent();

        if (newContent.length == 0) return;
        if (oldContent.length == 0) return;

        int newNumber= 0;
        for (byte b1 : newContent) {
            if (b1 == '\n') newNumber += 1;
        }
        if (newContent[newContent.length - 1] != '\n') newNumber += 1;

        if (newNumber == this.newNumber) return;

        int oldNumber= 0;
        for (byte b1 : oldContent) {
            if (b1 == '\n') oldNumber += 1;
        }
        if (oldContent[oldContent.length - 1] != '\n') oldNumber += 1;

        GitDiffLine diffLine = new GitDiffLine();
        diffLine.setType(GitDiffLineType.META);
        diffLine.setText("");
        diffLine.setOldNumber(oldNumber);
        diffLine.setNewNumber(newNumber);
        diffLines.add(diffLine);
    }

    @Override
    protected void writeHunkHeader(int aStartLine, int aEndLine, int bStartLine, int bEndLine) throws IOException {
        super.writeHunkHeader(aStartLine, aEndLine, bStartLine, bEndLine);

        StringBuilder sb = new StringBuilder();
        sb.append('@');
        sb.append('@');
        writeRange(sb, '-', aStartLine + 1, aEndLine - aStartLine);
        writeRange(sb, '+', bStartLine + 1, bEndLine - bStartLine);
        sb.append(' ');
        sb.append('@');
        sb.append('@');
        sb.append('\n');

        GitDiffLine diffLine = new GitDiffLine();
        diffLine.setType(GitDiffLineType.META);
        diffLine.setText(sb.toString());
        diffLine.setOldNumber(aStartLine);
        diffLine.setNewNumber(bStartLine);
        diffLines.add(diffLine);
        this.oldNumber = aStartLine;
        this.newNumber = bStartLine;
    }

    private void writeRange(StringBuilder sb, char prefix, int begin, int cnt) {
        sb.append(' ');
        sb.append(prefix);
        switch (cnt) {
            case 0:
                // If the range is empty, its beginning number must be the
                // line just before the range, or 0 if the range is at the
                // start of the file stream. Here, begin is always 1 based,
                // so an empty file would produce "0,0".
                //
                sb.append(new String(encodeASCII(begin - 1)));
                sb.append(',');
                sb.append('0');
                break;

            case 1:
                // If the range is exactly one line, produce only the number.
                //
                sb.append(new String(encodeASCII(begin)));
                break;

            default:
                sb.append(new String(encodeASCII(begin)));
                sb.append(',');
                sb.append(new String(encodeASCII(cnt)));
                break;
        }
    }

    @Override
    protected void writeContextLine(RawText text, int line) throws IOException {
        super.writeContextLine(text, line);
        oldNumber += 1;
        newNumber += 1;
        GitDiffLine diffLine = new GitDiffLine();
        diffLine.setType(GitDiffLineType.MATCH);
        diffLine.setOldNumber(oldNumber);
        diffLine.setNewNumber(newNumber);
        diffLine.setText(text.getString(line, line + 1, false));
        diffLines.add(diffLine);
    }

    @Override
    protected void writeRemovedLine(RawText text, int line) throws IOException {
        super.writeRemovedLine(text, line);
        oldNumber += 1;
        GitDiffLine diffLine = new GitDiffLine();
        diffLine.setType(GitDiffLineType.DELETE);
        diffLine.setOldNumber(oldNumber);
        diffLine.setNewNumber(newNumber);
        diffLine.setText(text.getString(line, line + 1, false));
        diffLines.add(diffLine);
    }

    @Override
    protected void writeAddedLine(RawText text, int line) throws IOException {
        super.writeAddedLine(text, line);
        newNumber += 1;
        GitDiffLine diffLine = new GitDiffLine();
        diffLine.setType(GitDiffLineType.ADD);
        diffLine.setOldNumber(oldNumber);
        diffLine.setNewNumber(newNumber);
        diffLine.setText(text.getString(line, line + 1, false));
        diffLines.add(diffLine);
    }
}
